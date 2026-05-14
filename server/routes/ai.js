const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const rateLimit = require('express-rate-limit');
const db = require('../db');

// AI rate limiter: 20 requests per hour
const aiRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: { error: 'AI rate limit exceeded. Max 20 requests/hour.' },
  validate: { xForwardedForHeader: false }
});

// Apply rate limiter to all AI routes
router.use(aiRateLimiter);

// Helper: parse AI JSON response
function parseAIJson(text) {
  try { return JSON.parse(text); } catch (e) {}
  const stripped = text.replace(/```(?:json)?\n?/g, '').replace(/```/g, '').trim();
  try { return JSON.parse(stripped); } catch (e) {}
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start !== -1 && end !== -1) {
    try { return JSON.parse(text.slice(start, end + 1)); } catch (e) {}
  }
  return null;
}

// Helper: persist AI result
async function persistAIResult(userId, endpoint, inputData, result) {
  try {
    await db.query(
      'INSERT INTO ai_results (user_id, endpoint, input_data, result) VALUES ($1, $2, $3, $4)',
      [userId || null, endpoint, JSON.stringify(inputData), typeof result === 'string' ? result : JSON.stringify(result)]
    );
  } catch (e) {
    console.error('Failed to persist AI result:', e.message);
  }
}

async function callOpenRouter(systemPrompt, userPrompt) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:3000',
      'X-Title': 'AI Marina Manager'
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL || 'anthropic/claude-3-5-sonnet-20241022',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 2000
    })
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} - ${errorBody}`);
  }

  const data = await response.json();
  return {
    result: data.choices[0].message.content,
    model: data.model,
    usage: data.usage
  };
}

// POST /api/ai/slip-pricing
router.post('/slip-pricing', async (req, res) => {
  try {
    const { seasonalRates, occupancyRate, season, marketData } = req.body;
    let slips = req.body.slips;

    // Fetch real slip inventory from DB
    let dbSlips = [];
    try {
      const slipsResult = await db.query('SELECT * FROM slips ORDER BY id LIMIT 30');
      dbSlips = slipsResult.rows;
    } catch (e) { console.error('Failed to fetch slips for AI:', e.message); }

    // Merge DB data with request data
    const slipInventory = dbSlips.length > 0 ? dbSlips : (slips || []);

    const systemPrompt = `You are an expert marina pricing consultant with deep knowledge of marina operations, seasonal demand patterns, and competitive pricing strategies for boat slip rentals.

Return ONLY valid JSON with this exact structure:
{
  "recommended_rates": [{"slip_type": string, "current_rate": number, "recommended_rate": number, "change_percent": number, "reasoning": string}],
  "seasonal_adjustment": string,
  "occupancy_impact": string,
  "summary": string
}`;

    const userPrompt = `Analyze the following marina slip inventory and provide pricing optimization:

Current Slip Inventory (from database): ${JSON.stringify(slipInventory)}
Current Seasonal Rates: ${JSON.stringify(seasonalRates || 'Not provided')}
Current Occupancy Rate: ${occupancyRate || 'Not provided'}
Current Season: ${season || 'Not provided'}
Market Data/Context: ${marketData || 'South Florida marina market, Fort Lauderdale area'}

Return JSON with recommended_rates for each slip type, seasonal_adjustment, occupancy_impact, and summary.`;

    const aiResponse = await callOpenRouter(systemPrompt, userPrompt);
    const parsed = parseAIJson(aiResponse.result);

    await persistAIResult(req.user?.id, 'slip-pricing', { occupancyRate, season, slipCount: slipInventory.length }, aiResponse.result);

    res.json({ ...aiResponse, structured: parsed });
  } catch (err) {
    console.error('AI slip pricing error:', err);
    res.status(500).json({ error: 'Failed to generate pricing analysis', details: err.message });
  }
});

// POST /api/ai/weather-advisory
router.post('/weather-advisory', async (req, res) => {
  try {
    const { weatherData, vessels, currentConditions, forecast } = req.body;

    const systemPrompt = `You are an experienced marina harbor master and marine weather specialist. You analyze weather data and conditions to provide safety advisories for marina operations, vessel owners, and staff.

Your advisories should be clear, actionable, and prioritized by urgency.`;

    const userPrompt = `Based on the following weather data, please generate a comprehensive marina weather advisory:

Current Weather Data: ${JSON.stringify(weatherData || 'Not provided')}
Vessels in Marina: ${JSON.stringify(vessels || 'Not provided')}
Current Conditions: ${currentConditions || 'Not provided'}
Weather Forecast: ${forecast || 'Not provided'}

Please provide:
1. Current conditions summary and risk assessment
2. Immediate safety advisories (if any)
3. Recommended actions for marina staff
4. Recommended actions for vessel owners
5. 24-48 hour outlook and preparation advice
6. Any special alerts or warnings`;

    const aiResponse = await callOpenRouter(systemPrompt, userPrompt);
    await persistAIResult(req.user?.id, 'weather-advisory', { currentConditions }, aiResponse.result);
    res.json(aiResponse);
  } catch (err) {
    console.error('AI weather advisory error:', err);
    res.status(500).json({ error: 'Failed to generate weather advisory', details: err.message });
  }
});

// POST /api/ai/maintenance-prediction
router.post('/maintenance-prediction', async (req, res) => {
  try {
    const { infrastructure, age, lastInspections, environmentalFactors } = req.body;

    // Fetch recent work orders from DB
    let dbWorkOrders = [];
    try {
      const woResult = await db.query('SELECT * FROM work_orders ORDER BY created_at DESC LIMIT 20');
      dbWorkOrders = woResult.rows;
    } catch (e) { console.error('Failed to fetch work orders for AI:', e.message); }

    const workOrders = dbWorkOrders.length > 0 ? dbWorkOrders : (req.body.workOrders || []);

    const systemPrompt = `You are a marina infrastructure maintenance expert and predictive maintenance analyst. You analyze maintenance history, infrastructure age, environmental conditions, and usage patterns to predict upcoming maintenance needs and prevent costly failures.

Provide specific maintenance timelines, cost estimates, and priority rankings.`;

    const userPrompt = `Please analyze the following marina maintenance data and provide predictive maintenance recommendations:

Recent Work Orders (from database): ${JSON.stringify(workOrders)}
Infrastructure Details: ${JSON.stringify(infrastructure || 'Not provided')}
Facility Age/History: ${age || 'Not provided'}
Last Inspections: ${JSON.stringify(lastInspections || 'Not provided')}
Environmental Factors: ${environmentalFactors || 'South Florida coastal environment - salt air, hurricanes, UV exposure'}

Please provide:
1. Critical maintenance items needing immediate attention
2. Predicted maintenance needs for next 30/60/90 days
3. Seasonal maintenance recommendations
4. Cost estimates and budget planning advice
5. Preventive maintenance schedule recommendations`;

    const aiResponse = await callOpenRouter(systemPrompt, userPrompt);
    await persistAIResult(req.user?.id, 'maintenance-prediction', { workOrderCount: workOrders.length }, aiResponse.result);
    res.json(aiResponse);
  } catch (err) {
    console.error('AI maintenance prediction error:', err);
    res.status(500).json({ error: 'Failed to generate maintenance prediction', details: err.message });
  }
});

// POST /api/ai/waitlist-priority
router.post('/waitlist-priority', async (req, res) => {
  try {
    const { availableSlips, currentTenants, criteria } = req.body;

    // Fetch waiting list from DB
    let dbWaitingList = [];
    try {
      const wlResult = await db.query('SELECT * FROM waiting_list ORDER BY created_at ASC LIMIT 50');
      dbWaitingList = wlResult.rows;
    } catch (e) { console.error('Failed to fetch waiting list for AI:', e.message); }

    const waitingList = dbWaitingList.length > 0 ? dbWaitingList : (req.body.waitingList || []);

    const systemPrompt = `You are a marina operations manager specializing in slip allocation and waitlist management. You analyze waitlist applicants against available inventory and marina policies to recommend optimal slip assignments and priority rankings.

Provide clear priority rankings with justification, and recommend specific slip assignments where possible.`;

    const userPrompt = `Please analyze the following waiting list and provide prioritized recommendations:

Waiting List Applicants (from database): ${JSON.stringify(waitingList)}
Available Slips: ${JSON.stringify(availableSlips || 'Not provided')}
Current Tenant Info: ${JSON.stringify(currentTenants || 'Not provided')}
Priority Criteria: ${criteria || 'Standard marina priority criteria'}

Please provide:
1. Recommended priority ranking of all waitlist applicants
2. Specific slip assignment recommendations for top candidates
3. Justification for each priority ranking
4. Revenue impact analysis of recommended assignments
5. Recommendations for applicants who cannot be accommodated`;

    const aiResponse = await callOpenRouter(systemPrompt, userPrompt);
    await persistAIResult(req.user?.id, 'waitlist-priority', { waitlistCount: waitingList.length }, aiResponse.result);
    res.json(aiResponse);
  } catch (err) {
    console.error('AI waitlist priority error:', err);
    res.status(500).json({ error: 'Failed to generate waitlist priorities', details: err.message });
  }
});

// POST /api/ai/insurance-analysis
router.post('/insurance-analysis', async (req, res) => {
  try {
    const { insuranceRecords, boats, tenants, marinaRequirements } = req.body;

    const systemPrompt = `You are a marine insurance specialist and marina risk management consultant. You analyze insurance policies, coverage levels, and compliance to ensure marina and vessel owner protection.

Provide specific coverage recommendations, flag any compliance issues, and identify risk exposure areas.`;

    const userPrompt = `Please analyze the following insurance data and provide a comprehensive insurance compliance report:

Insurance Records: ${JSON.stringify(insuranceRecords || 'Not provided')}
Boat Information: ${JSON.stringify(boats || 'Not provided')}
Tenant Information: ${JSON.stringify(tenants || 'Not provided')}
Marina Requirements: ${marinaRequirements || 'Standard South Florida marina insurance requirements: minimum $300,000 liability, hull coverage required for all vessels, current certificates required'}

Please provide:
1. Compliance status overview (compliant/non-compliant/expiring soon)
2. Specific coverage gap analysis for each vessel
3. Policies expiring within 30/60/90 days
4. Recommended minimum coverage levels by vessel category
5. Risk exposure assessment for the marina
6. Action items for non-compliant tenants`;

    const aiResponse = await callOpenRouter(systemPrompt, userPrompt);
    await persistAIResult(req.user?.id, 'insurance-analysis', { recordCount: (insuranceRecords || []).length }, aiResponse.result);
    res.json(aiResponse);
  } catch (err) {
    console.error('AI insurance analysis error:', err);
    res.status(500).json({ error: 'Failed to generate insurance analysis', details: err.message });
  }
});

// POST /api/ai/occupancy-optimizer — maximize slip utilization by vessel type
router.post('/occupancy-optimizer', async (req, res) => {
  try {
    const { season, vesselMix, targetOccupancy } = req.body;
    let dbSlips = [];
    let dbBoats = [];
    try {
      const slipsResult = await db.query('SELECT * FROM slips ORDER BY id LIMIT 50');
      dbSlips = slipsResult.rows;
    } catch (e) { /* table may not exist */ }
    try {
      const boatsResult = await db.query('SELECT * FROM boats ORDER BY id LIMIT 50');
      dbBoats = boatsResult.rows;
    } catch (e) { /* table may not exist */ }

    const systemPrompt = `You are a marina operations analyst. Optimize slip utilization across vessel types and seasons.
Return ONLY valid JSON: {
  "current_utilization": number,
  "target_utilization": number,
  "reassignment_recommendations": [{"slip_id": any, "current_vessel": string, "recommended_vessel_type": string, "rationale": string}],
  "vessel_type_demand_forecast": [{"type": string, "expected_demand": string, "supply_gap": string}],
  "revenue_uplift_estimate": string,
  "summary": string
}`;
    const userPrompt = `Optimize slip occupancy for this marina.

Slip inventory: ${JSON.stringify(dbSlips).slice(0, 4000)}
Active vessels: ${JSON.stringify(dbBoats).slice(0, 4000)}
Vessel mix override: ${JSON.stringify(vesselMix || null)}
Season: ${season || 'unspecified'}
Target occupancy: ${targetOccupancy || 'unspecified'}`;

    const aiResponse = await callOpenRouter(systemPrompt, userPrompt);
    const parsed = parseAIJson(aiResponse.result);
    await persistAIResult(req.user?.id, 'occupancy-optimizer', { season, slipCount: dbSlips.length, boatCount: dbBoats.length }, aiResponse.result);
    res.json({ ...aiResponse, structured: parsed });
  } catch (err) {
    console.error('AI occupancy optimizer error:', err);
    res.status(500).json({ error: 'Failed to generate occupancy optimization', details: err.message });
  }
});

// POST /api/ai/tenant-churn-predictor — identify at-risk long-term tenants
router.post('/tenant-churn-predictor', async (req, res) => {
  try {
    const { lookbackMonths = 12 } = req.body;
    let tenants = [];
    try {
      const result = await db.query('SELECT * FROM tenants ORDER BY id LIMIT 100');
      tenants = result.rows;
    } catch (e) { /* table may not exist */ }

    const systemPrompt = `You are a marina tenant retention analyst. Score churn risk for long-term slip tenants.
Return ONLY valid JSON: {
  "at_risk_tenants": [{"tenant_id": any, "name": string, "churn_risk_score": number, "risk_level": "low"|"medium"|"high", "key_signals": [string], "recommended_action": string}],
  "overall_churn_rate_estimate": string,
  "primary_drivers": [string],
  "retention_playbook": [string]
}`;
    const userPrompt = `Score churn risk across the tenant base for the past ${lookbackMonths} months.

Tenants (sample): ${JSON.stringify(tenants).slice(0, 5000)}`;

    const aiResponse = await callOpenRouter(systemPrompt, userPrompt);
    const parsed = parseAIJson(aiResponse.result);
    await persistAIResult(req.user?.id, 'tenant-churn-predictor', { lookbackMonths, tenantCount: tenants.length }, aiResponse.result);
    res.json({ ...aiResponse, structured: parsed });
  } catch (err) {
    console.error('AI tenant churn error:', err);
    res.status(500).json({ error: 'Failed to predict tenant churn', details: err.message });
  }
});

// ==================== Apply pass 4: Maintenance Cost Forecaster ====================
// POST /api/ai/maintenance-cost-forecaster
router.post('/maintenance-cost-forecaster', async (req, res) => {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(503).json({ error: 'AI service not configured (OPENROUTER_API_KEY missing)' });
    }
    const { horizonMonths = 12 } = req.body;
    let workOrders = [];
    try {
      const r = await db.query('SELECT * FROM work_orders ORDER BY id DESC LIMIT 200');
      workOrders = r.rows;
    } catch (e) { /* table may not exist */ }

    const systemPrompt = `You are a marina facilities maintenance economist. Forecast capital and operating maintenance costs.
Return ONLY valid JSON: {
  "horizon_months": number,
  "forecast_total_usd": number,
  "monthly_breakdown": [{"month_offset": number, "estimated_cost_usd": number, "drivers": [string]}],
  "high_risk_assets": [{"asset": string, "risk": "low"|"medium"|"high", "expected_cost_usd": number, "reasoning": string}],
  "cost_saving_opportunities": [string],
  "summary": string
}`;
    const userPrompt = `Forecast maintenance costs for the next ${horizonMonths} months.

Recent work orders (sample): ${JSON.stringify(workOrders).slice(0, 5000)}`;

    const aiResponse = await callOpenRouter(systemPrompt, userPrompt);
    const parsed = parseAIJson(aiResponse.result);
    await persistAIResult(req.user?.id, 'maintenance-cost-forecaster', { horizonMonths, workOrderCount: workOrders.length }, aiResponse.result);
    res.json({ ...aiResponse, structured: parsed });
  } catch (err) {
    console.error('AI maintenance cost forecaster error:', err);
    res.status(500).json({ error: 'Failed to forecast maintenance costs', details: err.message });
  }
});

// ==================== Apply pass 4: Emergency Preparedness Plan ====================
// POST /api/ai/emergency-preparedness-plan
router.post('/emergency-preparedness-plan', async (req, res) => {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(503).json({ error: 'AI service not configured (OPENROUTER_API_KEY missing)' });
    }
    const { scenario = 'hurricane', leadTimeHours = 72 } = req.body;
    let prepRecords = [];
    let weatherRecords = [];
    let slips = [];
    try {
      const r = await db.query('SELECT * FROM hurricane_prep ORDER BY id DESC LIMIT 50');
      prepRecords = r.rows;
    } catch (e) { /* optional */ }
    try {
      const r = await db.query('SELECT * FROM weather ORDER BY id DESC LIMIT 30');
      weatherRecords = r.rows;
    } catch (e) { /* optional */ }
    try {
      const r = await db.query('SELECT * FROM slips ORDER BY id LIMIT 50');
      slips = r.rows;
    } catch (e) { /* optional */ }

    const systemPrompt = `You are a marina emergency preparedness coordinator. Build an actionable plan for the requested scenario.
Return ONLY valid JSON: {
  "scenario": string,
  "lead_time_hours": number,
  "phases": [{"phase": string, "hours_before_event": number, "actions": [string], "owners": [string]}],
  "communications_plan": [string],
  "asset_protection_priorities": [string],
  "evacuation_or_haul_out_plan": [string],
  "post_event_recovery_steps": [string],
  "summary": string
}`;
    const userPrompt = `Build an emergency preparedness plan.

Scenario: ${scenario}
Lead time: ${leadTimeHours} hours
Existing hurricane-prep records (sample): ${JSON.stringify(prepRecords).slice(0, 3000)}
Recent weather context (sample): ${JSON.stringify(weatherRecords).slice(0, 2000)}
Slip inventory (sample): ${JSON.stringify(slips).slice(0, 2000)}`;

    const aiResponse = await callOpenRouter(systemPrompt, userPrompt);
    const parsed = parseAIJson(aiResponse.result);
    await persistAIResult(req.user?.id, 'emergency-preparedness-plan', { scenario, leadTimeHours }, aiResponse.result);
    res.json({ ...aiResponse, structured: parsed });
  } catch (err) {
    console.error('AI emergency preparedness error:', err);
    res.status(500).json({ error: 'Failed to build preparedness plan', details: err.message });
  }
});

// ==================== Apply pass 4: Weather Impact Forecast ====================
// POST /api/ai/weather-impact-forecast
router.post('/weather-impact-forecast', async (req, res) => {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(503).json({ error: 'AI service not configured (OPENROUTER_API_KEY missing)' });
    }
    const { horizonDays = 14, currentConditions } = req.body;
    let weatherRecords = [];
    let financial = [];
    try {
      const r = await db.query('SELECT * FROM weather ORDER BY id DESC LIMIT 60');
      weatherRecords = r.rows;
    } catch (e) { /* optional */ }
    try {
      const r = await db.query('SELECT * FROM financial ORDER BY id DESC LIMIT 60');
      financial = r.rows;
    } catch (e) { /* optional */ }

    const systemPrompt = `You are a marina revenue & risk analyst. Translate weather forecasts into operational and revenue impact.
Return ONLY valid JSON: {
  "horizon_days": number,
  "expected_disruption_days": number,
  "revenue_impact_estimate_usd": number,
  "fuel_demand_impact": string,
  "transient_demand_impact": string,
  "operational_recommendations": [string],
  "revenue_protection_actions": [string],
  "summary": string
}`;
    const userPrompt = `Estimate the next ${horizonDays}-day weather impact on marina operations and revenue.

Current conditions: ${JSON.stringify(currentConditions || null)}
Recent weather records (sample): ${JSON.stringify(weatherRecords).slice(0, 4000)}
Recent financial records (sample): ${JSON.stringify(financial).slice(0, 3000)}`;

    const aiResponse = await callOpenRouter(systemPrompt, userPrompt);
    const parsed = parseAIJson(aiResponse.result);
    await persistAIResult(req.user?.id, 'weather-impact-forecast', { horizonDays }, aiResponse.result);
    res.json({ ...aiResponse, structured: parsed });
  } catch (err) {
    console.error('AI weather impact forecast error:', err);
    res.status(500).json({ error: 'Failed to forecast weather impact', details: err.message });
  }
});

module.exports = router;
