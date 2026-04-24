const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/financial
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM financial_records ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching financial records:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/financial/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM financial_records WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Financial record not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching financial record:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/financial
router.post('/', async (req, res) => {
  try {
    const { record_type, category, description, amount, tenant_id, slip_id, invoice_number, due_date, paid_date, payment_method, status, late_fee, notes } = req.body;
    const result = await pool.query(
      `INSERT INTO financial_records (record_type, category, description, amount, tenant_id, slip_id, invoice_number, due_date, paid_date, payment_method, status, late_fee, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
      [record_type, category, description, amount, tenant_id, slip_id, invoice_number, due_date, paid_date, payment_method, status, late_fee, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating financial record:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/financial/:id
router.put('/:id', async (req, res) => {
  try {
    const { record_type, category, description, amount, tenant_id, slip_id, invoice_number, due_date, paid_date, payment_method, status, late_fee, notes } = req.body;
    const result = await pool.query(
      `UPDATE financial_records SET record_type=$1, category=$2, description=$3, amount=$4, tenant_id=$5, slip_id=$6, invoice_number=$7, due_date=$8, paid_date=$9, payment_method=$10, status=$11, late_fee=$12, notes=$13
       WHERE id=$14 RETURNING *`,
      [record_type, category, description, amount, tenant_id, slip_id, invoice_number, due_date, paid_date, payment_method, status, late_fee, notes, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Financial record not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating financial record:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/financial/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM financial_records WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Financial record not found' });
    }
    res.json({ message: 'Financial record deleted', record: result.rows[0] });
  } catch (err) {
    console.error('Error deleting financial record:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
