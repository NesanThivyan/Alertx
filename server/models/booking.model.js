const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    location: String,
    reason: String,
    status: { type: String, default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
