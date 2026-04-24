const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/insurance
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM insurance_requirements ORDER BY expiry_date ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching insurance requirements:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/insurance/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM insurance_requirements WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Insurance requirement not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching insurance requirement:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/insurance
router.post('/', async (req, res) => {
  try {
    const { boat_id, tenant_id, tenant_name, boat_name, policy_number, insurance_company, coverage_type, coverage_amount, deductible, effective_date, expiry_date, liability_amount, status, verified, notes } = req.body;
    const result = await pool.query(
      `INSERT INTO insurance_requirements (boat_id, tenant_id, tenant_name, boat_name, policy_number, insurance_company, coverage_type, coverage_amount, deductible, effective_date, expiry_date, liability_amount, status, verified, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *`,
      [boat_id, tenant_id, tenant_name, boat_name, policy_number, insurance_company, coverage_type, coverage_amount, deductible, effective_date, expiry_date, liability_amount, status, verified, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating insurance requirement:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/insurance/:id
router.put('/:id', async (req, res) => {
  try {
    const { boat_id, tenant_id, tenant_name, boat_name, policy_number, insurance_company, coverage_type, coverage_amount, deductible, effective_date, expiry_date, liability_amount, status, verified, notes } = req.body;
    const result = await pool.query(
      `UPDATE insurance_requirements SET boat_id=$1, tenant_id=$2, tenant_name=$3, boat_name=$4, policy_number=$5, insurance_company=$6, coverage_type=$7, coverage_amount=$8, deductible=$9, effective_date=$10, expiry_date=$11, liability_amount=$12, status=$13, verified=$14, notes=$15
       WHERE id=$16 RETURNING *`,
      [boat_id, tenant_id, tenant_name, boat_name, policy_number, insurance_company, coverage_type, coverage_amount, deductible, effective_date, expiry_date, liability_amount, status, verified, notes, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Insurance requirement not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating insurance requirement:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/insurance/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM insurance_requirements WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Insurance requirement not found' });
    }
    res.json({ message: 'Insurance requirement deleted', requirement: result.rows[0] });
  } catch (err) {
    console.error('Error deleting insurance requirement:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
