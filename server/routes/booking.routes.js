const router = require('express').Router();
const { protect } = require('../middleware/auth.middleware');
const { createBooking, updateBooking, deleteBooking } = require('../controllers/booking.controller');

router.post('/user/booking', protect, createBooking);
router.put('/user/booking', protect, updateBooking);
router.delete('/user/booking', protect, deleteBooking);

module.exports = router;

