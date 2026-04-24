const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/amenities
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM amenity_access ORDER BY tenant_name, amenity_type');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching amenity access:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/amenities/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM amenity_access WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Amenity access entry not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching amenity access entry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/amenities
router.post('/', async (req, res) => {
  try {
    const { tenant_id, tenant_name, amenity_type, access_code, key_number, start_date, end_date, status, monthly_fee, notes } = req.body;
    const result = await pool.query(
      `INSERT INTO amenity_access (tenant_id, tenant_name, amenity_type, access_code, key_number, start_date, end_date, status, monthly_fee, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [tenant_id, tenant_name, amenity_type, access_code, key_number, start_date, end_date, status, monthly_fee, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating amenity access entry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/amenities/:id
router.put('/:id', async (req, res) => {
  try {
    const { tenant_id, tenant_name, amenity_type, access_code, key_number, start_date, end_date, status, monthly_fee, notes } = req.body;
    const result = await pool.query(
      `UPDATE amenity_access SET tenant_id=$1, tenant_name=$2, amenity_type=$3, access_code=$4, key_number=$5, start_date=$6, end_date=$7, status=$8, monthly_fee=$9, notes=$10
       WHERE id=$11 RETURNING *`,
      [tenant_id, tenant_name, amenity_type, access_code, key_number, start_date, end_date, status, monthly_fee, notes, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Amenity access entry not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating amenity access entry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/amenities/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM amenity_access WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Amenity access entry not found' });
    }
    res.json({ message: 'Amenity access entry deleted', entry: result.rows[0] });
  } catch (err) {
    console.error('Error deleting amenity access entry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
