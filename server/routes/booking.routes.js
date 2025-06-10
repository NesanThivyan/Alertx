const router = require('express').Router();
const { protect, isAdmin } = require('../middleware/auth.middleware');
const { createBooking, updateBooking, deleteBooking, getAllBookings, getBookingById } = require('../controllers/booking.controller');

// Create a new booking
router.post('/', protect, createBooking);

// Update a specific booking (by ID)
router.put('/:id', protect, updateBooking);

// Delete a specific booking (by ID)
router.delete('/:id', protect, deleteBooking);

// Admin routes
router.get('/', protect, isAdmin, getAllBookings);        // GET /api/bookings
router.get('/:id', protect, isAdmin, getBookingById);     // GET /api/bookings/:id

module.exports = router;