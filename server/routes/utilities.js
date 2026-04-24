const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/utilities
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM utility_readings ORDER BY reading_date DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching utility readings:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/utilities/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM utility_readings WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Utility reading not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching utility reading:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/utilities
router.post('/', async (req, res) => {
  try {
    const { slip_id, reading_date, electric_kwh, water_gallons, electric_cost, water_cost, notes } = req.body;
    const result = await pool.query(
      `INSERT INTO utility_readings (slip_id, reading_date, electric_kwh, water_gallons, electric_cost, water_cost, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [slip_id, reading_date, electric_kwh, water_gallons, electric_cost, water_cost, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating utility reading:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/utilities/:id
router.put('/:id', async (req, res) => {
  try {
    const { slip_id, reading_date, electric_kwh, water_gallons, electric_cost, water_cost, notes } = req.body;
    const result = await pool.query(
      `UPDATE utility_readings SET slip_id=$1, reading_date=$2, electric_kwh=$3, water_gallons=$4, electric_cost=$5, water_cost=$6, notes=$7
       WHERE id=$8 RETURNING *`,
      [slip_id, reading_date, electric_kwh, water_gallons, electric_cost, water_cost, notes, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Utility reading not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating utility reading:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/utilities/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM utility_readings WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Utility reading not found' });
    }
    res.json({ message: 'Utility reading deleted', reading: result.rows[0] });
  } catch (err) {
    console.error('Error deleting utility reading:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
