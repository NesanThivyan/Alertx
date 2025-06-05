const Medical = require('../models/medical.model');

// Create medical details
exports.createMedical = async (req, res) => {
    try {
        const medical = await Medical.create({ ...req.body, user: req.user._id });
        res.status(201).json({ success: true, message: 'Medical details updated', data: medical });
    } catch (error) {
        res.status(422).json({ success: false, message: 'Validation error', error: error.message });
    }
};

// Update medical details
exports.updateMedical = async (req, res) => {
    try {
        const updated = await Medical.findOneAndUpdate({ user: req.user._id }, req.body, { new: true });
        if (!updated) return res.status(404).json({ success: false, message: 'No record found' });
        res.status(200).json({ success: true, message: 'Medical details updated', data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};
