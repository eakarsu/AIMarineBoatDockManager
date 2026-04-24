const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/boats
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM boats ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching boats:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/boats/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM boats WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Boat not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching boat:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/boats
router.post('/', async (req, res) => {
  try {
    const { name, registration_number, hull_id, boat_type, manufacturer, model, year, length_ft, beam_ft, draft_ft, weight_lbs, engine_type, engine_count, fuel_type, color, tenant_id, slip_id, insurance_company, insurance_policy, insurance_expiry, status, photo_url, notes } = req.body;
    const result = await pool.query(
      `INSERT INTO boats (name, registration_number, hull_id, boat_type, manufacturer, model, year, length_ft, beam_ft, draft_ft, weight_lbs, engine_type, engine_count, fuel_type, color, tenant_id, slip_id, insurance_company, insurance_policy, insurance_expiry, status, photo_url, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23) RETURNING *`,
      [name, registration_number, hull_id, boat_type, manufacturer, model, year, length_ft, beam_ft, draft_ft, weight_lbs, engine_type, engine_count, fuel_type, color, tenant_id, slip_id, insurance_company, insurance_policy, insurance_expiry, status, photo_url, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating boat:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/boats/:id
router.put('/:id', async (req, res) => {
  try {
    const { name, registration_number, hull_id, boat_type, manufacturer, model, year, length_ft, beam_ft, draft_ft, weight_lbs, engine_type, engine_count, fuel_type, color, tenant_id, slip_id, insurance_company, insurance_policy, insurance_expiry, status, photo_url, notes } = req.body;
    const result = await pool.query(
      `UPDATE boats SET name=$1, registration_number=$2, hull_id=$3, boat_type=$4, manufacturer=$5, model=$6, year=$7, length_ft=$8, beam_ft=$9, draft_ft=$10, weight_lbs=$11, engine_type=$12, engine_count=$13, fuel_type=$14, color=$15, tenant_id=$16, slip_id=$17, insurance_company=$18, insurance_policy=$19, insurance_expiry=$20, status=$21, photo_url=$22, notes=$23
       WHERE id=$24 RETURNING *`,
      [name, registration_number, hull_id, boat_type, manufacturer, model, year, length_ft, beam_ft, draft_ft, weight_lbs, engine_type, engine_count, fuel_type, color, tenant_id, slip_id, insurance_company, insurance_policy, insurance_expiry, status, photo_url, notes, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Boat not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating boat:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/boats/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM boats WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Boat not found' });
    }
    res.json({ message: 'Boat deleted', boat: result.rows[0] });
  } catch (err) {
    console.error('Error deleting boat:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
