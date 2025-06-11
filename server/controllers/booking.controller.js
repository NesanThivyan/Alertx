const Booking = require('../models/booking.model');

// Create a new booking
exports.createBooking = async (req, res) => {
    try {
        const booking = await Booking.create({ 
            ...req.body, 
            user: req.user._id 
        });
        return res.status(201).json({ 
            success: true, 
            message: 'Booking created successfully.', 
            data: booking 
        });
    } catch (error) {
        return res.status(400).json({ 
            success: false, 
            message: 'Failed to create booking.', 
            error: error.message 
        });
    }
};

// Update an existing booking by ID for the logged-in user
exports.updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findOneAndUpdate(
            { _id: id, user: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!booking) {
            return res.status(404).json({ 
                success: false, 
                message: 'Booking not found or unauthorized.' 
            });
        }

        return res.status(200).json({ 
            success: true, 
            message: 'Booking updated successfully.', 
            data: booking 
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: 'Failed to update booking.', 
            error: error.message 
        });
    }
};

// Delete a booking by ID for the logged-in user
exports.deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findOneAndDelete({ 
            _id: id, 
            user: req.user._id 
        });

        if (!booking) {
            return res.status(404).json({ 
                success: false, 
                message: 'Booking not found or unauthorized.' 
            });
        }

        return res.status(200).json({ 
            success: true, 
            message: 'Booking cancelled successfully.' 
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: 'Failed to delete booking.', 
            error: error.message 
        });
    }
};

// Get all bookings (admin only)
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user', 'name email');
        return res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: 'Server error', 
            error: error.message 
        });
    }
};

// Get a single booking by ID (admin)
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('user', 'name email');
        if (!booking) {
            return res.status(404).json({ 
                success: false, 
                message: 'Booking not found' 
            });
        }
        return res.status(200).json({ success: true, data: booking });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: 'Server error', 
            error: error.message 
        });
    }
};