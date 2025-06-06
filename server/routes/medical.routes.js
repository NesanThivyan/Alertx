const router = require('express').Router();
const { protect } = require('../middleware/auth.middleware');
const { createMedical, updateMedical } = require('../controllers/medical.controller');

router.post('/user/medi', protect, createMedical);
router.put('/user/medi', protect, updateMedical);

module.exports = router;

