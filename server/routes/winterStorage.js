const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/winter-storage
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM winter_storage ORDER BY haul_out_date DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching winter storage:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/winter-storage/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM winter_storage WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Winter storage entry not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching winter storage entry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/winter-storage
router.post('/', async (req, res) => {
  try {
    const { boat_id, boat_name, owner_name, storage_type, location, haul_out_date, launch_date, shrink_wrap, block_stand, monthly_rate, total_contract, status, winterization_done, notes } = req.body;
    const result = await pool.query(
      `INSERT INTO winter_storage (boat_id, boat_name, owner_name, storage_type, location, haul_out_date, launch_date, shrink_wrap, block_stand, monthly_rate, total_contract, status, winterization_done, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *`,
      [boat_id, boat_name, owner_name, storage_type, location, haul_out_date, launch_date, shrink_wrap, block_stand, monthly_rate, total_contract, status, winterization_done, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating winter storage entry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/winter-storage/:id
router.put('/:id', async (req, res) => {
  try {
    const { boat_id, boat_name, owner_name, storage_type, location, haul_out_date, launch_date, shrink_wrap, block_stand, monthly_rate, total_contract, status, winterization_done, notes } = req.body;
    const result = await pool.query(
      `UPDATE winter_storage SET boat_id=$1, boat_name=$2, owner_name=$3, storage_type=$4, location=$5, haul_out_date=$6, launch_date=$7, shrink_wrap=$8, block_stand=$9, monthly_rate=$10, total_contract=$11, status=$12, winterization_done=$13, notes=$14
       WHERE id=$15 RETURNING *`,
      [boat_id, boat_name, owner_name, storage_type, location, haul_out_date, launch_date, shrink_wrap, block_stand, monthly_rate, total_contract, status, winterization_done, notes, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Winter storage entry not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating winter storage entry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/winter-storage/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM winter_storage WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Winter storage entry not found' });
    }
    res.json({ message: 'Winter storage entry deleted', entry: result.rows[0] });
  } catch (err) {
    console.error('Error deleting winter storage entry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
