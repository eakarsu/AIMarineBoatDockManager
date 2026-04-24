const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/transient
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM transient_docking ORDER BY arrival_date DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching transient docking:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/transient/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM transient_docking WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Transient docking entry not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching transient docking entry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/transient
router.post('/', async (req, res) => {
  try {
    const { boat_name, captain_name, phone, email, boat_length_ft, boat_type, slip_id, arrival_date, departure_date, nightly_rate, total_charge, payment_status, status, notes } = req.body;
    const result = await pool.query(
      `INSERT INTO transient_docking (boat_name, captain_name, phone, email, boat_length_ft, boat_type, slip_id, arrival_date, departure_date, nightly_rate, total_charge, payment_status, status, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *`,
      [boat_name, captain_name, phone, email, boat_length_ft, boat_type, slip_id, arrival_date, departure_date, nightly_rate, total_charge, payment_status, status, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating transient docking entry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/transient/:id
router.put('/:id', async (req, res) => {
  try {
    const { boat_name, captain_name, phone, email, boat_length_ft, boat_type, slip_id, arrival_date, departure_date, nightly_rate, total_charge, payment_status, status, notes } = req.body;
    const result = await pool.query(
      `UPDATE transient_docking SET boat_name=$1, captain_name=$2, phone=$3, email=$4, boat_length_ft=$5, boat_type=$6, slip_id=$7, arrival_date=$8, departure_date=$9, nightly_rate=$10, total_charge=$11, payment_status=$12, status=$13, notes=$14
       WHERE id=$15 RETURNING *`,
      [boat_name, captain_name, phone, email, boat_length_ft, boat_type, slip_id, arrival_date, departure_date, nightly_rate, total_charge, payment_status, status, notes, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Transient docking entry not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating transient docking entry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/transient/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM transient_docking WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Transient docking entry not found' });
    }
    res.json({ message: 'Transient docking entry deleted', entry: result.rows[0] });
  } catch (err) {
    console.error('Error deleting transient docking entry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
