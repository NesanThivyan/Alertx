const mongoose = require('mongoose');

const caretakerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    relationshipToPatient: String,
    assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Caretaker', caretakerSchema);
// filepath: /home/nesanthivyan/Alertx/server/models/caretaker.model.js