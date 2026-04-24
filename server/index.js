const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

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
app.use('/api/slips', slipsRoutes);
app.use('/api/tenants', tenantsRoutes);
app.use('/api/boats', boatsRoutes);
app.use('/api/utilities', utilitiesRoutes);
app.use('/api/fuel', fuelRoutes);
app.use('/api/launch', launchRoutes);
app.use('/api/dry-storage', dryStorageRoutes);
app.use('/api/transient', transientRoutes);
app.use('/api/winter-storage', winterStorageRoutes);
app.use('/api/work-orders', workOrdersRoutes);
app.use('/api/haul-outs', haulOutsRoutes);
app.use('/api/pump-out', pumpOutRoutes);
app.use('/api/environmental', environmentalRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/ship-store', shipStoreRoutes);
app.use('/api/waiting-list', waitingListRoutes);
app.use('/api/hurricane-prep', hurricanePrepRoutes);
app.use('/api/parking', parkingRoutes);
app.use('/api/amenities', amenitiesRoutes);
app.use('/api/financial', financialRoutes);
app.use('/api/seasonal-rates', seasonalRatesRoutes);
app.use('/api/insurance', insuranceRoutes);
app.use('/api/ai', aiRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Marina Manager API server running on port ${PORT}`);
});

module.exports = app;
