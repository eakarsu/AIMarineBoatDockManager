const express = require('express');
const router = express.Router();
function risk(input = {}) {
  const slips = input.slips || [
    { slip: 'B-14', freeboard_ft: 1.1, surge_ft: 3.2, line_condition: 'worn' },
    { slip: 'C-02', freeboard_ft: 4.5, surge_ft: 2.1, line_condition: 'good' },
  ];
  return { slips: slips.map(s => {
    const score = Math.min(100, Math.max(0, Number(s.surge_ft) - Number(s.freeboard_ft)) * 30 + (s.line_condition === 'worn' ? 30 : 0));
    return { ...s, risk_score: Math.round(score), action: score >= 60 ? 'relocate_or_double_line' : score >= 30 ? 'inspect_lines' : 'normal' };
  }) };
}
router.get('/', (req, res) => res.json(risk()));
router.post('/risk', (req, res) => res.json(risk(req.body || {})));
module.exports = router;
