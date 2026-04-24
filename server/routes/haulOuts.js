const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/haul-outs
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM haul_outs ORDER BY scheduled_date DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching haul outs:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/haul-outs/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM haul_outs WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Haul out not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching haul out:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/haul-outs
router.post('/', async (req, res) => {
  try {
    const { boat_id, boat_name, owner_name, equipment_type, scheduled_date, scheduled_time, service_type, estimated_duration, status, fee, operator, notes } = req.body;
    const result = await pool.query(
      `INSERT INTO haul_outs (boat_id, boat_name, owner_name, equipment_type, scheduled_date, scheduled_time, service_type, estimated_duration, status, fee, operator, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
      [boat_id, boat_name, owner_name, equipment_type, scheduled_date, scheduled_time, service_type, estimated_duration, status, fee, operator, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating haul out:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/haul-outs/:id
router.put('/:id', async (req, res) => {
  try {
    const { boat_id, boat_name, owner_name, equipment_type, scheduled_date, scheduled_time, service_type, estimated_duration, status, fee, operator, notes } = req.body;
    const result = await pool.query(
      `UPDATE haul_outs SET boat_id=$1, boat_name=$2, owner_name=$3, equipment_type=$4, scheduled_date=$5, scheduled_time=$6, service_type=$7, estimated_duration=$8, status=$9, fee=$10, operator=$11, notes=$12
       WHERE id=$13 RETURNING *`,
      [boat_id, boat_name, owner_name, equipment_type, scheduled_date, scheduled_time, service_type, estimated_duration, status, fee, operator, notes, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Haul out not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating haul out:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/haul-outs/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM haul_outs WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Haul out not found' });
    }
    res.json({ message: 'Haul out deleted', haulOut: result.rows[0] });
  } catch (err) {
    console.error('Error deleting haul out:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
