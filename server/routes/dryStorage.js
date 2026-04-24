const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/dry-storage
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM dry_storage ORDER BY section, bay_number');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching dry storage:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/dry-storage/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM dry_storage WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Dry storage bay not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching dry storage bay:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/dry-storage
router.post('/', async (req, res) => {
  try {
    const { bay_number, section, level, max_length_ft, max_weight_lbs, boat_id, boat_name, tenant_id, monthly_rate, status, start_date, end_date, notes } = req.body;
    const result = await pool.query(
      `INSERT INTO dry_storage (bay_number, section, level, max_length_ft, max_weight_lbs, boat_id, boat_name, tenant_id, monthly_rate, status, start_date, end_date, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
      [bay_number, section, level, max_length_ft, max_weight_lbs, boat_id, boat_name, tenant_id, monthly_rate, status, start_date, end_date, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating dry storage bay:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/dry-storage/:id
router.put('/:id', async (req, res) => {
  try {
    const { bay_number, section, level, max_length_ft, max_weight_lbs, boat_id, boat_name, tenant_id, monthly_rate, status, start_date, end_date, notes } = req.body;
    const result = await pool.query(
      `UPDATE dry_storage SET bay_number=$1, section=$2, level=$3, max_length_ft=$4, max_weight_lbs=$5, boat_id=$6, boat_name=$7, tenant_id=$8, monthly_rate=$9, status=$10, start_date=$11, end_date=$12, notes=$13
       WHERE id=$14 RETURNING *`,
      [bay_number, section, level, max_length_ft, max_weight_lbs, boat_id, boat_name, tenant_id, monthly_rate, status, start_date, end_date, notes, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Dry storage bay not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating dry storage bay:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/dry-storage/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM dry_storage WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Dry storage bay not found' });
    }
    res.json({ message: 'Dry storage bay deleted', bay: result.rows[0] });
  } catch (err) {
    console.error('Error deleting dry storage bay:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
