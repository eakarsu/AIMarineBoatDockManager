const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/environmental
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM environmental_compliance ORDER BY expiry_date ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching environmental compliance:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/environmental/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM environmental_compliance WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Environmental compliance entry not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching environmental compliance entry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/environmental
router.post('/', async (req, res) => {
  try {
    const { item_type, item_name, location, inspection_date, expiry_date, status, inspector, certificate_number, description, action_required, notes } = req.body;
    const result = await pool.query(
      `INSERT INTO environmental_compliance (item_type, item_name, location, inspection_date, expiry_date, status, inspector, certificate_number, description, action_required, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
      [item_type, item_name, location, inspection_date, expiry_date, status, inspector, certificate_number, description, action_required, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating environmental compliance entry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/environmental/:id
router.put('/:id', async (req, res) => {
  try {
    const { item_type, item_name, location, inspection_date, expiry_date, status, inspector, certificate_number, description, action_required, notes } = req.body;
    const result = await pool.query(
      `UPDATE environmental_compliance SET item_type=$1, item_name=$2, location=$3, inspection_date=$4, expiry_date=$5, status=$6, inspector=$7, certificate_number=$8, description=$9, action_required=$10, notes=$11
       WHERE id=$12 RETURNING *`,
      [item_type, item_name, location, inspection_date, expiry_date, status, inspector, certificate_number, description, action_required, notes, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Environmental compliance entry not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating environmental compliance entry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/environmental/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM environmental_compliance WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Environmental compliance entry not found' });
    }
    res.json({ message: 'Environmental compliance entry deleted', entry: result.rows[0] });
  } catch (err) {
    console.error('Error deleting environmental compliance entry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
