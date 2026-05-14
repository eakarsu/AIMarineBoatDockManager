const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/slips
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const result = await pool.query('SELECT * FROM slips ORDER BY dock, slip_number LIMIT $1 OFFSET $2', [limit, offset]);
    const countResult = await pool.query('SELECT COUNT(*) FROM slips');
    const total = parseInt(countResult.rows[0].count);
    res.json({ data: result.rows, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } });
  } catch (err) {
    console.error('Error fetching slips:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/slips/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM slips WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Slip not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching slip:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/slips
router.post('/', async (req, res) => {
  try {
    const { slip_number, dock, length_ft, width_ft, depth_ft, slip_type, has_electric, has_water, electric_amp, status, monthly_rate, daily_rate, location_x, location_y, notes } = req.body;
    const result = await pool.query(
      `INSERT INTO slips (slip_number, dock, length_ft, width_ft, depth_ft, slip_type, has_electric, has_water, electric_amp, status, monthly_rate, daily_rate, location_x, location_y, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *`,
      [slip_number, dock, length_ft, width_ft, depth_ft, slip_type, has_electric, has_water, electric_amp, status, monthly_rate, daily_rate, location_x, location_y, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating slip:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/slips/:id
router.put('/:id', async (req, res) => {
  try {
    const { slip_number, dock, length_ft, width_ft, depth_ft, slip_type, has_electric, has_water, electric_amp, status, monthly_rate, daily_rate, location_x, location_y, notes } = req.body;
    const result = await pool.query(
      `UPDATE slips SET slip_number=$1, dock=$2, length_ft=$3, width_ft=$4, depth_ft=$5, slip_type=$6, has_electric=$7, has_water=$8, electric_amp=$9, status=$10, monthly_rate=$11, daily_rate=$12, location_x=$13, location_y=$14, notes=$15
       WHERE id=$16 RETURNING *`,
      [slip_number, dock, length_ft, width_ft, depth_ft, slip_type, has_electric, has_water, electric_amp, status, monthly_rate, daily_rate, location_x, location_y, notes, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Slip not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating slip:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/slips/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM slips WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Slip not found' });
    }
    res.json({ message: 'Slip deleted', slip: result.rows[0] });
  } catch (err) {
    console.error('Error deleting slip:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
