const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/tenants
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tenants ORDER BY last_name, first_name');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching tenants:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/tenants/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tenants WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tenant not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching tenant:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/tenants
router.post('/', async (req, res) => {
  try {
    const { first_name, last_name, email, phone, address, emergency_contact, emergency_phone, slip_id, lease_start, lease_end, lease_type, monthly_rate, deposit_amount, insurance_policy, insurance_expiry, status, notes } = req.body;
    const result = await pool.query(
      `INSERT INTO tenants (first_name, last_name, email, phone, address, emergency_contact, emergency_phone, slip_id, lease_start, lease_end, lease_type, monthly_rate, deposit_amount, insurance_policy, insurance_expiry, status, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING *`,
      [first_name, last_name, email, phone, address, emergency_contact, emergency_phone, slip_id, lease_start, lease_end, lease_type, monthly_rate, deposit_amount, insurance_policy, insurance_expiry, status, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating tenant:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/tenants/:id
router.put('/:id', async (req, res) => {
  try {
    const { first_name, last_name, email, phone, address, emergency_contact, emergency_phone, slip_id, lease_start, lease_end, lease_type, monthly_rate, deposit_amount, insurance_policy, insurance_expiry, status, notes } = req.body;
    const result = await pool.query(
      `UPDATE tenants SET first_name=$1, last_name=$2, email=$3, phone=$4, address=$5, emergency_contact=$6, emergency_phone=$7, slip_id=$8, lease_start=$9, lease_end=$10, lease_type=$11, monthly_rate=$12, deposit_amount=$13, insurance_policy=$14, insurance_expiry=$15, status=$16, notes=$17
       WHERE id=$18 RETURNING *`,
      [first_name, last_name, email, phone, address, emergency_contact, emergency_phone, slip_id, lease_start, lease_end, lease_type, monthly_rate, deposit_amount, insurance_policy, insurance_expiry, status, notes, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tenant not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating tenant:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/tenants/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM tenants WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tenant not found' });
    }
    res.json({ message: 'Tenant deleted', tenant: result.rows[0] });
  } catch (err) {
    console.error('Error deleting tenant:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
