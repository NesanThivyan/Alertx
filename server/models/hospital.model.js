const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: String,
    phone: String,
    email: String,
    password: { type: String, required: true, select: false },
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number] }
    },
    // Add this field:
    role: { type: String, enum: ['hospital', 'admin'], default: 'hospital' }
}, { timestamps: true });

module.exports = mongoose.model('Hospital', hospitalSchema);



















