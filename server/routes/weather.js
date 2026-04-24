const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/weather
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM weather_data ORDER BY recorded_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching weather data:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/weather/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM weather_data WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Weather data not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching weather data:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/weather
router.post('/', async (req, res) => {
  try {
    const { recorded_at, temperature_f, wind_speed_mph, wind_direction, humidity_pct, pressure_inhg, visibility_miles, wave_height_ft, water_temp_f, conditions, forecast, alerts } = req.body;
    const result = await pool.query(
      `INSERT INTO weather_data (recorded_at, temperature_f, wind_speed_mph, wind_direction, humidity_pct, pressure_inhg, visibility_miles, wave_height_ft, water_temp_f, conditions, forecast, alerts)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
      [recorded_at, temperature_f, wind_speed_mph, wind_direction, humidity_pct, pressure_inhg, visibility_miles, wave_height_ft, water_temp_f, conditions, forecast, alerts]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating weather data:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/weather/:id
router.put('/:id', async (req, res) => {
  try {
    const { recorded_at, temperature_f, wind_speed_mph, wind_direction, humidity_pct, pressure_inhg, visibility_miles, wave_height_ft, water_temp_f, conditions, forecast, alerts } = req.body;
    const result = await pool.query(
      `UPDATE weather_data SET recorded_at=$1, temperature_f=$2, wind_speed_mph=$3, wind_direction=$4, humidity_pct=$5, pressure_inhg=$6, visibility_miles=$7, wave_height_ft=$8, water_temp_f=$9, conditions=$10, forecast=$11, alerts=$12
       WHERE id=$13 RETURNING *`,
      [recorded_at, temperature_f, wind_speed_mph, wind_direction, humidity_pct, pressure_inhg, visibility_miles, wave_height_ft, water_temp_f, conditions, forecast, alerts, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Weather data not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating weather data:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/weather/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM weather_data WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Weather data not found' });
    }
    res.json({ message: 'Weather data deleted', data: result.rows[0] });
  } catch (err) {
    console.error('Error deleting weather data:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
