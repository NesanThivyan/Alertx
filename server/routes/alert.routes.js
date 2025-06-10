const router = require('express').Router();
const { protect } = require('../middleware/auth.middleware');
const {
    createAlert, getAlerts, getAlertById, updateAlertStatus
} = require('../controllers/alert.controller');

// Remove '/alerts' from the start of each path!
router.post('/create', protect, createAlert);
router.get('/', protect, getAlerts);
router.get('/:id', protect, getAlertById);
router.put('/:id/status', protect, updateAlertStatus);

module.exports = router;