const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/parking
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM parking_permits ORDER BY permit_number');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching parking permits:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/parking/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM parking_permits WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Parking permit not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching parking permit:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/parking
router.post('/', async (req, res) => {
  try {
    const { tenant_id, permit_number, vehicle_make, vehicle_model, vehicle_color, license_plate, state, lot_zone, start_date, expiry_date, status, fee, notes } = req.body;
    const result = await pool.query(
      `INSERT INTO parking_permits (tenant_id, permit_number, vehicle_make, vehicle_model, vehicle_color, license_plate, state, lot_zone, start_date, expiry_date, status, fee, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
      [tenant_id, permit_number, vehicle_make, vehicle_model, vehicle_color, license_plate, state, lot_zone, start_date, expiry_date, status, fee, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating parking permit:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/parking/:id
router.put('/:id', async (req, res) => {
  try {
    const { tenant_id, permit_number, vehicle_make, vehicle_model, vehicle_color, license_plate, state, lot_zone, start_date, expiry_date, status, fee, notes } = req.body;
    const result = await pool.query(
      `UPDATE parking_permits SET tenant_id=$1, permit_number=$2, vehicle_make=$3, vehicle_model=$4, vehicle_color=$5, license_plate=$6, state=$7, lot_zone=$8, start_date=$9, expiry_date=$10, status=$11, fee=$12, notes=$13
       WHERE id=$14 RETURNING *`,
      [tenant_id, permit_number, vehicle_make, vehicle_model, vehicle_color, license_plate, state, lot_zone, start_date, expiry_date, status, fee, notes, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Parking permit not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating parking permit:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/parking/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM parking_permits WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Parking permit not found' });
    }
    res.json({ message: 'Parking permit deleted', permit: result.rows[0] });
  } catch (err) {
    console.error('Error deleting parking permit:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
