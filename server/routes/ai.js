const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

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
      model: process.env.OPENROUTER_MODEL,
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
    const { slips, seasonalRates, occupancyRate, season, marketData } = req.body;

    const systemPrompt = `You are an expert marina pricing consultant with deep knowledge of marina operations, seasonal demand patterns, and competitive pricing strategies for boat slip rentals. You analyze slip inventory, current occupancy rates, seasonal trends, and market conditions to provide data-driven pricing recommendations.

Your recommendations should consider:
- Slip size, location, and amenities (electric amperage, water access)
- Current occupancy rates and demand patterns
- Seasonal pricing adjustments (peak winter season in South Florida vs summer)
- Competitive market positioning
- Revenue optimization while maintaining high occupancy
- Premium pricing for end slips, corner slips, and yacht basin locations
- Transient vs annual lease rate optimization

Provide specific dollar amounts and percentage adjustments in your recommendations. Format your response with clear sections and actionable recommendations.`;

    const userPrompt = `Please analyze the following marina slip data and provide pricing optimization recommendations:

Current Slip Inventory: ${JSON.stringify(slips || 'Not provided')}
Current Seasonal Rates: ${JSON.stringify(seasonalRates || 'Not provided')}
Current Occupancy Rate: ${occupancyRate || 'Not provided'}
Current Season: ${season || 'Not provided'}
Market Data/Context: ${marketData || 'South Florida marina market, Fort Lauderdale area'}

Please provide:
1. Recommended rate adjustments for each slip category
2. Seasonal pricing strategy recommendations
3. Transient docking rate optimization
4. Revenue impact projections
5. Competitive positioning advice`;

    const aiResponse = await callOpenRouter(systemPrompt, userPrompt);
    res.json(aiResponse);
  } catch (err) {
    console.error('AI slip pricing error:', err);
    res.status(500).json({ error: 'Failed to generate pricing analysis', details: err.message });
  }
});

// POST /api/ai/weather-advisory
router.post('/weather-advisory', async (req, res) => {
  try {
    const { weatherData, vessels, currentConditions, forecast } = req.body;

    const systemPrompt = `You are an experienced marina harbor master and marine weather specialist. You analyze weather data and conditions to provide safety advisories for marina operations, vessel owners, and staff. Your advisories cover:

- Wind and wave conditions affecting dock safety
- Storm preparation recommendations
- Small craft advisories and their impact on marina operations
- Tide and current considerations
- Lightning and thunderstorm safety protocols
- Temperature impacts on vessels and systems (freeze warnings, heat advisories)
- Fog and visibility warnings for navigation
- Tropical weather monitoring during hurricane season (June 1 - November 30)

Your advisories should be clear, actionable, and prioritized by urgency. Include specific actions marina staff and boat owners should take. Use marine weather terminology appropriately.`;

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
    res.json(aiResponse);
  } catch (err) {
    console.error('AI weather advisory error:', err);
    res.status(500).json({ error: 'Failed to generate weather advisory', details: err.message });
  }
});

// POST /api/ai/maintenance-prediction
router.post('/maintenance-prediction', async (req, res) => {
  try {
    const { workOrders, infrastructure, age, lastInspections, environmentalFactors } = req.body;

    const systemPrompt = `You are a marina infrastructure maintenance expert and predictive maintenance analyst. You analyze maintenance history, infrastructure age, environmental conditions, and usage patterns to predict upcoming maintenance needs and prevent costly failures.

Your expertise covers:
- Dock and piling structural integrity (wood, concrete, steel)
- Electrical systems (shore power, lighting, panels)
- Plumbing and water systems
- Fuel dock equipment and storage tanks
- Travel lifts and marine railways
- Seawalls and breakwaters
- Navigational aids and signage
- Environmental compliance equipment (pumpout stations, oil/water separators)
- Dredging and silting patterns
- Impact of saltwater, UV, hurricanes, and marine growth on infrastructure

Provide specific maintenance timelines, cost estimates, and priority rankings. Focus on preventive maintenance to avoid emergency repairs.`;

    const userPrompt = `Please analyze the following marina maintenance data and provide predictive maintenance recommendations:

Recent Work Orders: ${JSON.stringify(workOrders || 'Not provided')}
Infrastructure Details: ${JSON.stringify(infrastructure || 'Not provided')}
Facility Age/History: ${age || 'Not provided'}
Last Inspections: ${JSON.stringify(lastInspections || 'Not provided')}
Environmental Factors: ${environmentalFactors || 'South Florida coastal environment - salt air, hurricanes, UV exposure'}

Please provide:
1. Critical maintenance items needing immediate attention
2. Predicted maintenance needs for next 30/60/90 days
3. Seasonal maintenance recommendations
4. Cost estimates and budget planning advice
5. Preventive maintenance schedule recommendations
6. Infrastructure replacement timeline projections`;

    const aiResponse = await callOpenRouter(systemPrompt, userPrompt);
    res.json(aiResponse);
  } catch (err) {
    console.error('AI maintenance prediction error:', err);
    res.status(500).json({ error: 'Failed to generate maintenance prediction', details: err.message });
  }
});

// POST /api/ai/waitlist-priority
router.post('/waitlist-priority', async (req, res) => {
  try {
    const { waitingList, availableSlips, currentTenants, criteria } = req.body;

    const systemPrompt = `You are a marina operations manager specializing in slip allocation and waitlist management. You analyze waitlist applicants against available inventory and marina policies to recommend optimal slip assignments and priority rankings.

Your prioritization considers:
- Length of time on waiting list
- Boat size compatibility with available slips
- Annual vs seasonal commitment (annual leases prioritized)
- Multi-year lease willingness
- Referrals from existing tenants
- Revenue potential (larger vessels, premium slips)
- Special needs (live-aboard, deep draft, high amperage)
- Emergency situations (marina closures, displacement)
- Community fit and marina reputation
- Insurance and documentation compliance

Provide clear priority rankings with justification, and recommend specific slip assignments where possible.`;

    const userPrompt = `Please analyze the following waiting list and provide prioritized recommendations:

Waiting List Applicants: ${JSON.stringify(waitingList || 'Not provided')}
Available Slips: ${JSON.stringify(availableSlips || 'Not provided')}
Current Tenant Info: ${JSON.stringify(currentTenants || 'Not provided')}
Priority Criteria: ${criteria || 'Standard marina priority criteria'}

Please provide:
1. Recommended priority ranking of all waitlist applicants
2. Specific slip assignment recommendations for top candidates
3. Justification for each priority ranking
4. Revenue impact analysis of recommended assignments
5. Recommendations for applicants who cannot be accommodated
6. Suggestions for waitlist policy improvements`;

    const aiResponse = await callOpenRouter(systemPrompt, userPrompt);
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

    const systemPrompt = `You are a marine insurance specialist and marina risk management consultant. You analyze insurance policies, coverage levels, and compliance to ensure marina and vessel owner protection. Your expertise covers:

- Hull and machinery coverage requirements
- Protection and Indemnity (P&I) liability coverage
- Marina operator's legal liability
- Environmental pollution liability
- Named storm and hurricane coverage
- Minimum coverage requirements by vessel size and type
- Policy expiration tracking and renewal management
- Gap analysis between current coverage and requirements
- Risk assessment based on vessel type, value, and usage
- State and federal insurance regulations for marinas

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
6. Action items for non-compliant tenants
7. Recommendations for marina insurance policy improvements`;

    const aiResponse = await callOpenRouter(systemPrompt, userPrompt);
    res.json(aiResponse);
  } catch (err) {
    console.error('AI insurance analysis error:', err);
    res.status(500).json({ error: 'Failed to generate insurance analysis', details: err.message });
  }
});

module.exports = router;
