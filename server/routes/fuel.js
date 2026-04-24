const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/fuel
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM fuel_sales ORDER BY sale_date DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching fuel sales:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/fuel/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM fuel_sales WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Fuel sale not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching fuel sale:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/fuel
router.post('/', async (req, res) => {
  try {
    const { boat_id, boat_name, fuel_type, gallons, price_per_gallon, total_amount, pump_number, attendant, sale_date, payment_method, notes } = req.body;
    const result = await pool.query(
      `INSERT INTO fuel_sales (boat_id, boat_name, fuel_type, gallons, price_per_gallon, total_amount, pump_number, attendant, sale_date, payment_method, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
      [boat_id, boat_name, fuel_type, gallons, price_per_gallon, total_amount, pump_number, attendant, sale_date, payment_method, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating fuel sale:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/fuel/:id
router.put('/:id', async (req, res) => {
  try {
    const { boat_id, boat_name, fuel_type, gallons, price_per_gallon, total_amount, pump_number, attendant, sale_date, payment_method, notes } = req.body;
    const result = await pool.query(
      `UPDATE fuel_sales SET boat_id=$1, boat_name=$2, fuel_type=$3, gallons=$4, price_per_gallon=$5, total_amount=$6, pump_number=$7, attendant=$8, sale_date=$9, payment_method=$10, notes=$11
       WHERE id=$12 RETURNING *`,
      [boat_id, boat_name, fuel_type, gallons, price_per_gallon, total_amount, pump_number, attendant, sale_date, payment_method, notes, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Fuel sale not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating fuel sale:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/fuel/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM fuel_sales WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Fuel sale not found' });
    }
    res.json({ message: 'Fuel sale deleted', sale: result.rows[0] });
  } catch (err) {
    console.error('Error deleting fuel sale:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
