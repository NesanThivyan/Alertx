const Hospital = require('../models/hospital.model');

// Create hospital
exports.createHospital = async (req, res) => {
    try {
        const hospital = await Hospital.create(req.body);
        res.status(201).json({ success: true, data: hospital });
    } catch (error) {
        res.status(422).json({ success: false, message: 'Validation failed', error: error.message });
    }
};

// Get all hospitals
exports.getHospitals = async (req, res) => {
    try {
        const hospitals = await Hospital.find();
        res.status(200).json({ success: true, data: hospitals });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// Get single hospital
exports.getHospitalById = async (req, res) => {
    try {
        const hospital = await Hospital.findById(req.params.id);
        if (!hospital) {
            return res.status(404).json({ success: false, message: 'Hospital not found' });
        }
        res.status(200).json({ success: true, data: hospital });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Invalid hospital ID', error: error.message });
    }
};

// Update hospital
exports.updateHospital = async (req, res) => {
    try {
        const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!hospital) {
            return res.status(404).json({ success: false, message: 'Hospital not found' });
        }
        res.status(200).json({ success: true, message: 'Hospital updated', data: hospital });
    } catch (error) {
        res.status(422).json({ success: false, message: 'Validation failed', error: error.message });
    }
};

// Delete hospital
exports.deleteHospital = async (req, res) => {
    try {
        const hospital = await Hospital.findByIdAndDelete(req.params.id);
        if (!hospital) {
            return res.status(404).json({ success: false, message: 'Hospital not found' });
        }
        res.status(200).json({ success: true, message: 'Hospital deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};
exports.changeHospitalRole = async (req, res) => {
    try {
        const { role } = req.body; // role should be 'hospital' or 'admin'
        if (!['hospital', 'admin'].includes(role)) {
            return res.status(422).json({ success: false, message: 'Invalid role value' });
        }
        const hospital = await Hospital.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true, runValidators: true }
        );
        if (!hospital) {
            return res.status(404).json({ success: false, message: 'Hospital not found' });
        }
        res.status(200).json({ success: true, message: 'Hospital role updated', data: hospital });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};


exports.hospitalSignup = async (req, res) => {
    try {
        const { name, address, phone, email, location } = req.body;
        const hospital = await Hospital.create({
            name,
            address,
            phone,
            email,
            location,
            role: 'hospital' // default
        });
        res.status(201).json({ success: true, data: hospital });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};