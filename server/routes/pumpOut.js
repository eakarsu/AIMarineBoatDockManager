const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/pump-out
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pump_out_log ORDER BY service_date DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching pump out log:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/pump-out/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pump_out_log WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pump out entry not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching pump out entry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/pump-out
router.post('/', async (req, res) => {
  try {
    const { boat_name, slip_number, service_date, gallons_pumped, operator, pump_station, fee, compliance_tag, notes } = req.body;
    const result = await pool.query(
      `INSERT INTO pump_out_log (boat_name, slip_number, service_date, gallons_pumped, operator, pump_station, fee, compliance_tag, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [boat_name, slip_number, service_date, gallons_pumped, operator, pump_station, fee, compliance_tag, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating pump out entry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/pump-out/:id
router.put('/:id', async (req, res) => {
  try {
    const { boat_name, slip_number, service_date, gallons_pumped, operator, pump_station, fee, compliance_tag, notes } = req.body;
    const result = await pool.query(
      `UPDATE pump_out_log SET boat_name=$1, slip_number=$2, service_date=$3, gallons_pumped=$4, operator=$5, pump_station=$6, fee=$7, compliance_tag=$8, notes=$9
       WHERE id=$10 RETURNING *`,
      [boat_name, slip_number, service_date, gallons_pumped, operator, pump_station, fee, compliance_tag, notes, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pump out entry not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating pump out entry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/pump-out/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM pump_out_log WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pump out entry not found' });
    }
    res.json({ message: 'Pump out entry deleted', entry: result.rows[0] });
  } catch (err) {
    console.error('Error deleting pump out entry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
