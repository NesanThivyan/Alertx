const Alert = require('../models/alert.model');
const User = require('../models/user.model');

// Create alert

exports.createAlert = async (req, res) => {
    try {
        // Fetch user details
        const user = await User.findById(req.user._id);

        // Create alert with user details attached
        const alert = await Alert.create({
            ...req.body,
            user: req.user._id,
            userName: user.name,
            userEmail: user.email,
            userPhone: user.phone
        });

        res.status(201).json({ success: true, message: 'Alert sent', data: alert });
    } catch (error) {
        res.status(422).json({ success: false, message: 'Missing required data', error: error.message });
    }
};

// Get all alerts (Admin only)
exports.getAlerts = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Unauthorized access' });
        }
        const alerts = await Alert.find().populate('user');
        res.status(200).json({ success: true, data: alerts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// Get specific alert
exports.getAlertById = async (req, res) => {
    try {
        const alert = await Alert.findById(req.params.id);
        if (!alert) {
            return res.status(404).json({ success: false, message: 'Alert not found' });
        }
        res.status(200).json({ success: true, data: alert });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Invalid alert ID', error: error.message });
    }
};

// Update alert status
exports.updateAlertStatus = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Unauthorized access' });
        }
        const { status } = req.body;
        if (!['active', 'resolved'].includes(status)) {
            return res.status(422).json({ success: false, message: 'Invalid status value' });
        }
        const alert = await Alert.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!alert) {
            return res.status(404).json({ success: false, message: 'Alert not found' });
        }
        res.status(200).json({ success: true, message: 'Status updated', data: alert });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};