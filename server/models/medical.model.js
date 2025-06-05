const mongoose = require('mongoose');

const medicalSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bloodType: String,
    allergies: [String],
    conditions: [String],
    medications: [String]
}, { timestamps: true });

module.exports = mongoose.model('Medical', medicalSchema);
