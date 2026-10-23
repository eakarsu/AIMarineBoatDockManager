const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const app = express();
const db = require('./db');
const authenticateToken = require('./middleware/auth');

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

async function initializeRuntime() {
  if (process.env.MIGRATE_ON_START !== 'true') return;
  const email = process.env.PROVISION_ADMIN_EMAIL || process.env.ADMIN_EMAIL;
  const password = process.env.PROVISION_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;
  if (!email || !password) throw new Error('Runtime admin credentials are required');
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'manager',
      created_at TIMESTAMP DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS ai_results (
      id SERIAL PRIMARY KEY,
      user_id INTEGER,
      endpoint VARCHAR(100),
      input_data JSONB,
      result TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
  const passwordHash = await bcrypt.hash(password, 10);
  await db.query(
    `INSERT INTO users (email, password, name, role)
     VALUES ($1, $2, $3, 'manager')
     ON CONFLICT (email) DO UPDATE SET password = EXCLUDED.password, name = EXCLUDED.name, role = EXCLUDED.role`,
    [email, passwordHash, process.env.PROVISION_ADMIN_NAME || 'Runtime Administrator']
  );
}

// Route imports
const authRoutes = require('./routes/auth');
const slipsRoutes = require('./routes/slips');
const tenantsRoutes = require('./routes/tenants');
const boatsRoutes = require('./routes/boats');
const utilitiesRoutes = require('./routes/utilities');
const fuelRoutes = require('./routes/fuel');
const launchRoutes = require('./routes/launch');
const dryStorageRoutes = require('./routes/dryStorage');
const transientRoutes = require('./routes/transient');
const winterStorageRoutes = require('./routes/winterStorage');
const workOrdersRoutes = require('./routes/workOrders');
const haulOutsRoutes = require('./routes/haulOuts');
const pumpOutRoutes = require('./routes/pumpOut');
const environmentalRoutes = require('./routes/environmental');
const weatherRoutes = require('./routes/weather');
const shipStoreRoutes = require('./routes/shipStore');
const waitingListRoutes = require('./routes/waitingList');
const hurricanePrepRoutes = require('./routes/hurricanePrep');
const parkingRoutes = require('./routes/parking');
const amenitiesRoutes = require('./routes/amenities');
const financialRoutes = require('./routes/financial');
const seasonalRatesRoutes = require('./routes/seasonalRates');
const insuranceRoutes = require('./routes/insurance');
const aiRoutes = require('./routes/ai');

// Route registrations
app.use('/api/auth', authRoutes);
app.use('/api/slips', authenticateToken, slipsRoutes);
app.use('/api/fp-wave38c', require('./routes/fp-wave38c'));
app.use('/api/tenants', authenticateToken, tenantsRoutes);
app.use('/api/boats', authenticateToken, boatsRoutes);
app.use('/api/utilities', authenticateToken, utilitiesRoutes);
app.use('/api/fuel', authenticateToken, fuelRoutes);
app.use('/api/launch', authenticateToken, launchRoutes);
app.use('/api/dry-storage', authenticateToken, dryStorageRoutes);
app.use('/api/transient', authenticateToken, transientRoutes);
app.use('/api/winter-storage', authenticateToken, winterStorageRoutes);
app.use('/api/work-orders', authenticateToken, workOrdersRoutes);
app.use('/api/haul-outs', authenticateToken, haulOutsRoutes);
app.use('/api/pump-out', authenticateToken, pumpOutRoutes);
app.use('/api/environmental', authenticateToken, environmentalRoutes);
app.use('/api/weather', authenticateToken, weatherRoutes);
app.use('/api/ship-store', authenticateToken, shipStoreRoutes);
app.use('/api/waiting-list', authenticateToken, waitingListRoutes);
app.use('/api/hurricane-prep', authenticateToken, hurricanePrepRoutes);
app.use('/api/parking', authenticateToken, parkingRoutes);
app.use('/api/amenities', authenticateToken, amenitiesRoutes);
app.use('/api/financial', authenticateToken, financialRoutes);
app.use('/api/seasonal-rates', authenticateToken, seasonalRatesRoutes);
app.use('/api/insurance', authenticateToken, insuranceRoutes);
app.use('/api/ai', authenticateToken, aiRoutes);
app.use('/api/storm-surge-slip-risk', authenticateToken, require('./routes/stormSurgeSlipRisk'));

// GET /api/compliance-calendar — aggregated upcoming deadlines
app.get('/api/compliance-calendar', authenticateToken, async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const deadlines = [];

    // Insurance expiry from tenants
    const tenantInsurance = await db.query(`
      SELECT 'tenant_insurance' as type, first_name || ' ' || last_name as entity_name,
             insurance_expiry as deadline_date, 'Tenant insurance expiry' as description, 'insurance' as category
      FROM tenants
      WHERE insurance_expiry IS NOT NULL
      ORDER BY insurance_expiry ASC
      LIMIT 50
    `);
    deadlines.push(...tenantInsurance.rows);

    // Insurance expiry from boats
    const boatInsurance = await db.query(`
      SELECT 'boat_insurance' as type, name as entity_name,
             insurance_expiry as deadline_date, 'Boat insurance expiry' as description, 'insurance' as category
      FROM boats
      WHERE insurance_expiry IS NOT NULL
      ORDER BY insurance_expiry ASC
      LIMIT 50
    `);
    deadlines.push(...boatInsurance.rows);

    // Environmental compliance expiry
    const envCompliance = await db.query(`
      SELECT 'environmental' as type, item_name as entity_name,
             expiry_date as deadline_date, 'Environmental compliance: ' || item_type as description, 'environmental' as category
      FROM environmental_compliance
      WHERE expiry_date IS NOT NULL
      ORDER BY expiry_date ASC
      LIMIT 50
    `);
    deadlines.push(...envCompliance.rows);

    // Parking permit expiry
    const parkingExpiry = await db.query(`
      SELECT 'parking_permit' as type, permit_number as entity_name,
             expiry_date as deadline_date, 'Parking permit expiry' as description, 'permit' as category
      FROM parking_permits
      WHERE expiry_date IS NOT NULL AND status = 'active'
      ORDER BY expiry_date ASC
      LIMIT 50
    `);
    deadlines.push(...parkingExpiry.rows);

    // Enrich each with days_until and severity
    const enriched = deadlines
      .filter(d => d.deadline_date)
      .map(d => {
        const deadline = new Date(d.deadline_date);
        const todayDate = new Date(today);
        const daysUntil = Math.ceil((deadline - todayDate) / (1000 * 60 * 60 * 24));
        const severity = daysUntil < 0 ? 'overdue' : daysUntil < 7 ? 'critical' : daysUntil < 30 ? 'warning' : 'ok';
        return { ...d, days_until: daysUntil, severity };
      })
      .sort((a, b) => a.days_until - b.days_until);

    const overdue = enriched.filter(d => d.days_until < 0);
    const upcoming = enriched.filter(d => d.days_until >= 0);

    res.json({ overdue, upcoming, total: enriched.length });
  } catch (error) {
    console.error('Compliance calendar error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/ai-results — paginated history of AI calls
app.get('/api/ai-results', authenticateToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const result = await db.query(
      'SELECT id, user_id, endpoint, input_data, result, created_at FROM ai_results ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    const countResult = await db.query('SELECT COUNT(*) FROM ai_results');
    const total = parseInt(countResult.rows[0].count);
    res.json({ data: result.rows, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
  } catch (error) {
    console.error('AI results error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;
initializeRuntime()
  .then(() => app.listen(PORT, () => console.log(`Marina Manager API server running on port ${PORT}`)))
  .catch((error) => {
    console.error('Runtime initialization failed:', error.message);
    process.exit(1);
  });

module.exports = app;

// === BATCH 05 AUTO-MOUNT (custom feature suggestions) ===
app.use('/api/slip-assignment-agent', require('./routes/slip-assignment-agent'));
app.use('/api/weather-intel-stream', require('./routes/weather-intel-stream'));
app.use('/api/maintenance-autonomous', require('./routes/maintenance-autonomous'));
app.use('/api/tenant-lifecycle-agent', require('./routes/tenant-lifecycle-agent'));
app.use('/api/dynamic-slip-pricing', require('./routes/dynamic-slip-pricing'));

// === Batch 05 Gaps & Frontend Mounts ===
try { const _gap_weather_impact_forecast = require('./routes/gap-weather-impact-forecast'); app.use('/api/gap-weather-impact-forecast', _gap_weather_impact_forecast); } catch(e) { console.error('gap mount fail weather-impact-forecast:', e.message); }
try { const _gap_occupancy_optimizer = require('./routes/gap-occupancy-optimizer'); app.use('/api/gap-occupancy-optimizer', _gap_occupancy_optimizer); } catch(e) { console.error('gap mount fail occupancy-optimizer:', e.message); }
try { const _gap_tenant_churn_predictor = require('./routes/gap-tenant-churn-predictor'); app.use('/api/gap-tenant-churn-predictor', _gap_tenant_churn_predictor); } catch(e) { console.error('gap mount fail tenant-churn-predictor:', e.message); }
try { const _gap_maintenance_cost_forecaster = require('./routes/gap-maintenance-cost-forecaster'); app.use('/api/gap-maintenance-cost-forecaster', _gap_maintenance_cost_forecaster); } catch(e) { console.error('gap mount fail maintenance-cost-forecaster:', e.message); }
try { const _gap_emergency_preparedness_plan = require('./routes/gap-emergency-preparedness-plan'); app.use('/api/gap-emergency-preparedness-plan', _gap_emergency_preparedness_plan); } catch(e) { console.error('gap mount fail emergency-preparedness-plan:', e.message); }
try { const _gap_tenant_guest = require('./routes/gap-tenant-guest'); app.use('/api/gap-tenant-guest', _gap_tenant_guest); } catch(e) { console.error('gap mount fail tenant-guest:', e.message); }
try { const _gap_mobile = require('./routes/gap-mobile'); app.use('/api/gap-mobile', _gap_mobile); } catch(e) { console.error('gap mount fail mobile:', e.message); }
try { const _gap_webhooks = require('./routes/gap-webhooks'); app.use('/api/gap-webhooks', _gap_webhooks); } catch(e) { console.error('gap mount fail webhooks:', e.message); }
try { const _gap_fuel = require('./routes/gap-fuel'); app.use('/api/gap-fuel', _gap_fuel); } catch(e) { console.error('gap mount fail fuel:', e.message); }
try { const _gap_environmental = require('./routes/gap-environmental'); app.use('/api/gap-environmental', _gap_environmental); } catch(e) { console.error('gap mount fail environmental:', e.message); }
try { const _gap_coast = require('./routes/gap-coast'); app.use('/api/gap-coast', _gap_coast); } catch(e) { console.error('gap mount fail coast:', e.message); }
try { const _gap_substantive = require('./routes/gap-substantive'); app.use('/api/gap-substantive', _gap_substantive); } catch(e) { console.error('gap mount fail substantive:', e.message); }
try { const _gap_notifications_sms = require('./routes/gap-notifications-sms'); app.use('/api/gap-notifications-sms', _gap_notifications_sms); } catch(e) { console.error('gap mount fail notifications-sms:', e.message); }
// === End Batch 05 Mounts ===
