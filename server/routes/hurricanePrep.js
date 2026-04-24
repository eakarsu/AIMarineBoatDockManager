const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/hurricane-prep
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM hurricane_prep ORDER BY due_date ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching hurricane prep:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/hurricane-prep/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM hurricane_prep WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Hurricane prep entry not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching hurricane prep entry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/hurricane-prep
router.post('/', async (req, res) => {
  try {
    const { checklist_name, category, task_description, assigned_to, priority, status, due_date, completed_date, storm_name, notes } = req.body;
    const result = await pool.query(
      `INSERT INTO hurricane_prep (checklist_name, category, task_description, assigned_to, priority, status, due_date, completed_date, storm_name, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [checklist_name, category, task_description, assigned_to, priority, status, due_date, completed_date, storm_name, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating hurricane prep entry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/hurricane-prep/:id
router.put('/:id', async (req, res) => {
  try {
    const { checklist_name, category, task_description, assigned_to, priority, status, due_date, completed_date, storm_name, notes } = req.body;
    const result = await pool.query(
      `UPDATE hurricane_prep SET checklist_name=$1, category=$2, task_description=$3, assigned_to=$4, priority=$5, status=$6, due_date=$7, completed_date=$8, storm_name=$9, notes=$10
       WHERE id=$11 RETURNING *`,
      [checklist_name, category, task_description, assigned_to, priority, status, due_date, completed_date, storm_name, notes, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Hurricane prep entry not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating hurricane prep entry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/hurricane-prep/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM hurricane_prep WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Hurricane prep entry not found' });
    }
    res.json({ message: 'Hurricane prep entry deleted', entry: result.rows[0] });
  } catch (err) {
    console.error('Error deleting hurricane prep entry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
