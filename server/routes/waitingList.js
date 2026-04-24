const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/waiting-list
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM waiting_list ORDER BY priority_score DESC, request_date ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching waiting list:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/waiting-list/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM waiting_list WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Waiting list entry not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching waiting list entry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/waiting-list
router.post('/', async (req, res) => {
  try {
    const { first_name, last_name, email, phone, boat_name, boat_length_ft, boat_type, preferred_dock, preferred_slip_type, request_date, priority_score, status, notes } = req.body;
    const result = await pool.query(
      `INSERT INTO waiting_list (first_name, last_name, email, phone, boat_name, boat_length_ft, boat_type, preferred_dock, preferred_slip_type, request_date, priority_score, status, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
      [first_name, last_name, email, phone, boat_name, boat_length_ft, boat_type, preferred_dock, preferred_slip_type, request_date, priority_score, status, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating waiting list entry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/waiting-list/:id
router.put('/:id', async (req, res) => {
  try {
    const { first_name, last_name, email, phone, boat_name, boat_length_ft, boat_type, preferred_dock, preferred_slip_type, request_date, priority_score, status, notes } = req.body;
    const result = await pool.query(
      `UPDATE waiting_list SET first_name=$1, last_name=$2, email=$3, phone=$4, boat_name=$5, boat_length_ft=$6, boat_type=$7, preferred_dock=$8, preferred_slip_type=$9, request_date=$10, priority_score=$11, status=$12, notes=$13
       WHERE id=$14 RETURNING *`,
      [first_name, last_name, email, phone, boat_name, boat_length_ft, boat_type, preferred_dock, preferred_slip_type, request_date, priority_score, status, notes, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Waiting list entry not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating waiting list entry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/waiting-list/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM waiting_list WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Waiting list entry not found' });
    }
    res.json({ message: 'Waiting list entry deleted', entry: result.rows[0] });
  } catch (err) {
    console.error('Error deleting waiting list entry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
