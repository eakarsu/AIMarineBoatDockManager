const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/seasonal-rates
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM seasonal_rates ORDER BY start_date DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching seasonal rates:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/seasonal-rates/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM seasonal_rates WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Seasonal rate not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching seasonal rate:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/seasonal-rates
router.post('/', async (req, res) => {
  try {
    const { season_name, start_date, end_date, slip_type, base_rate_per_foot, electric_rate_kwh, water_rate_gallon, live_aboard_surcharge, transient_daily_rate, fuel_markup_pct, status, notes } = req.body;
    const result = await pool.query(
      `INSERT INTO seasonal_rates (season_name, start_date, end_date, slip_type, base_rate_per_foot, electric_rate_kwh, water_rate_gallon, live_aboard_surcharge, transient_daily_rate, fuel_markup_pct, status, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
      [season_name, start_date, end_date, slip_type, base_rate_per_foot, electric_rate_kwh, water_rate_gallon, live_aboard_surcharge, transient_daily_rate, fuel_markup_pct, status, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating seasonal rate:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/seasonal-rates/:id
router.put('/:id', async (req, res) => {
  try {
    const { season_name, start_date, end_date, slip_type, base_rate_per_foot, electric_rate_kwh, water_rate_gallon, live_aboard_surcharge, transient_daily_rate, fuel_markup_pct, status, notes } = req.body;
    const result = await pool.query(
      `UPDATE seasonal_rates SET season_name=$1, start_date=$2, end_date=$3, slip_type=$4, base_rate_per_foot=$5, electric_rate_kwh=$6, water_rate_gallon=$7, live_aboard_surcharge=$8, transient_daily_rate=$9, fuel_markup_pct=$10, status=$11, notes=$12
       WHERE id=$13 RETURNING *`,
      [season_name, start_date, end_date, slip_type, base_rate_per_foot, electric_rate_kwh, water_rate_gallon, live_aboard_surcharge, transient_daily_rate, fuel_markup_pct, status, notes, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Seasonal rate not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating seasonal rate:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/seasonal-rates/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM seasonal_rates WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Seasonal rate not found' });
    }
    res.json({ message: 'Seasonal rate deleted', rate: result.rows[0] });
  } catch (err) {
    console.error('Error deleting seasonal rate:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
