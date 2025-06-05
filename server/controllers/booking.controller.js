const Booking = require('../models/booking.model');

exports.createBooking = async (req, res) => {
    try {
        const booking = await Booking.create({ ...req.body, user: req.user._id });
        res.status(201).json({ success: true, message: 'Booking form submitted', data: booking });
    } catch (error) {
        res.status(422).json({ success: false, message: 'Invalid form data', error: error.message });
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findOneAndUpdate({ user: req.user._id }, req.body, { new: true });
        if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
        res.status(200).json({ success: true, message: 'Booking updated', data: booking });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findOneAndDelete({ user: req.user._id });
        if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
        res.status(200).json({ success: true, message: 'Booking cancelled' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Database error', error: error.message });
    }
};
