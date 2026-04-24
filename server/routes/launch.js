const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/launch
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM launch_schedule ORDER BY launch_date DESC, launch_time');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching launch schedule:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/launch/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM launch_schedule WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Launch entry not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching launch entry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/launch
router.post('/', async (req, res) => {
  try {
    const { boat_name, owner_name, phone, boat_type, length_ft, launch_date, launch_time, retrieval_date, retrieval_time, ramp_number, status, fee, notes } = req.body;
    const result = await pool.query(
      `INSERT INTO launch_schedule (boat_name, owner_name, phone, boat_type, length_ft, launch_date, launch_time, retrieval_date, retrieval_time, ramp_number, status, fee, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
      [boat_name, owner_name, phone, boat_type, length_ft, launch_date, launch_time, retrieval_date, retrieval_time, ramp_number, status, fee, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating launch entry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/launch/:id
router.put('/:id', async (req, res) => {
  try {
    const { boat_name, owner_name, phone, boat_type, length_ft, launch_date, launch_time, retrieval_date, retrieval_time, ramp_number, status, fee, notes } = req.body;
    const result = await pool.query(
      `UPDATE launch_schedule SET boat_name=$1, owner_name=$2, phone=$3, boat_type=$4, length_ft=$5, launch_date=$6, launch_time=$7, retrieval_date=$8, retrieval_time=$9, ramp_number=$10, status=$11, fee=$12, notes=$13
       WHERE id=$14 RETURNING *`,
      [boat_name, owner_name, phone, boat_type, length_ft, launch_date, launch_time, retrieval_date, retrieval_time, ramp_number, status, fee, notes, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Launch entry not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating launch entry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/launch/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM launch_schedule WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Launch entry not found' });
    }
    res.json({ message: 'Launch entry deleted', entry: result.rows[0] });
  } catch (err) {
    console.error('Error deleting launch entry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
