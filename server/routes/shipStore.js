const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/ship-store
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ship_store_sales ORDER BY sale_date DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching ship store sales:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/ship-store/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ship_store_sales WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ship store sale not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching ship store sale:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/ship-store
router.post('/', async (req, res) => {
  try {
    const { item_name, category, quantity, unit_price, total_price, customer_name, payment_method, sale_date, clerk, notes } = req.body;
    const result = await pool.query(
      `INSERT INTO ship_store_sales (item_name, category, quantity, unit_price, total_price, customer_name, payment_method, sale_date, clerk, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [item_name, category, quantity, unit_price, total_price, customer_name, payment_method, sale_date, clerk, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating ship store sale:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/ship-store/:id
router.put('/:id', async (req, res) => {
  try {
    const { item_name, category, quantity, unit_price, total_price, customer_name, payment_method, sale_date, clerk, notes } = req.body;
    const result = await pool.query(
      `UPDATE ship_store_sales SET item_name=$1, category=$2, quantity=$3, unit_price=$4, total_price=$5, customer_name=$6, payment_method=$7, sale_date=$8, clerk=$9, notes=$10
       WHERE id=$11 RETURNING *`,
      [item_name, category, quantity, unit_price, total_price, customer_name, payment_method, sale_date, clerk, notes, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ship store sale not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating ship store sale:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/ship-store/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM ship_store_sales WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ship store sale not found' });
    }
    res.json({ message: 'Ship store sale deleted', sale: result.rows[0] });
  } catch (err) {
    console.error('Error deleting ship store sale:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
