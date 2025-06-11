const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true }, // e.g., 'accident'
    location: { type: String, required: true }, // e.g., 'Jaffna Hospital Junction'
    description: { type: String, required: true },
    status: { type: String, enum: ['active', 'resolved'], default: 'active' },
    // Optional: keep geoLocation for map features
    geoLocation: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            default: undefined
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('Alert', alertSchema);