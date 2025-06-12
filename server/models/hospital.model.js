const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: String,
    phone: String,
    email: String,
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number] } // [longitude, latitude]
    }
}, { timestamps: true });

module.exports = mongoose.model('Hospital', hospitalSchema);