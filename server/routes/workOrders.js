const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/work-orders
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM work_orders ORDER BY reported_date DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching work orders:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/work-orders/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM work_orders WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Work order not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching work order:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/work-orders
router.post('/', async (req, res) => {
  try {
    const { title, description, category, priority, status, location, assigned_to, reported_by, reported_date, due_date, completed_date, estimated_cost, actual_cost, notes } = req.body;
    const result = await pool.query(
      `INSERT INTO work_orders (title, description, category, priority, status, location, assigned_to, reported_by, reported_date, due_date, completed_date, estimated_cost, actual_cost, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *`,
      [title, description, category, priority, status, location, assigned_to, reported_by, reported_date, due_date, completed_date, estimated_cost, actual_cost, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating work order:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/work-orders/:id
router.put('/:id', async (req, res) => {
  try {
    const { title, description, category, priority, status, location, assigned_to, reported_by, reported_date, due_date, completed_date, estimated_cost, actual_cost, notes } = req.body;
    const result = await pool.query(
      `UPDATE work_orders SET title=$1, description=$2, category=$3, priority=$4, status=$5, location=$6, assigned_to=$7, reported_by=$8, reported_date=$9, due_date=$10, completed_date=$11, estimated_cost=$12, actual_cost=$13, notes=$14
       WHERE id=$15 RETURNING *`,
      [title, description, category, priority, status, location, assigned_to, reported_by, reported_date, due_date, completed_date, estimated_cost, actual_cost, notes, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Work order not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating work order:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/work-orders/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM work_orders WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Work order not found' });
    }
    res.json({ message: 'Work order deleted', workOrder: result.rows[0] });
  } catch (err) {
    console.error('Error deleting work order:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
