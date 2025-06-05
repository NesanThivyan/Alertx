const router = require('express').Router();
const { protect } = require('../middleware/auth');
const {
    createAlert, getAlerts, getAlertById, updateAlertStatus
} = require('../controllers/alert.controller');

router.post('/alerts/create', protect, createAlert);
router.get('/alerts', protect, getAlerts);
router.get('/alerts/:id', protect, getAlertById);
router.put('/alerts/:id/status', protect, updateAlertStatus);

module.exports = router;

