const router = require('express').Router();
const { protect, isAdmin } = require('../middleware/auth.middleware');
const {
    createAlert, getAlerts, getAlertById, updateAlertStatus
} = require('../controllers/alert.controller');

// Remove '/alerts' from the start of each path!
router.post('/create', protect, createAlert);
router.get('/:id', protect, isAdmin, getAlertById);
router.get('/', protect, isAdmin, getAlerts);
router.put('/:id/status', protect, isAdmin, updateAlertStatus);

module.exports = router;