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






const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret';

exports.changeHospitalRole = async (req, res) => {
    try {
        const { role } = req.body;

        // Check valid role
        if (!['hospital', 'admin'].includes(role)) {
            return res.status(422).json({ success: false, message: 'Invalid role value' });
        }

        // Update hospital
        const hospital = await Hospital.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true, runValidators: true }
        );

        if (!hospital) {
            return res.status(404).json({ success: false, message: 'Hospital not found' });
        }

        // Sign a new JWT with updated role
        const token = jwt.sign(
            { id: hospital._id, role: hospital.role },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            success: true,
            message: 'Hospital role updated',
            token,
            data: hospital
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const bcrypt = require('bcryptjs');



exports.hospitalSignup = async (req, res) => {
    try {
        const { name, address, phone, email, password, location } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const hospital = await Hospital.create({
            name,
            address,
            phone,
            email,
            password: hashedPassword,
            location,
            role: 'hospital'
        });

        const token = jwt.sign(
            { id: hospital._id, role: hospital.role },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(201).json({ success: true, token, data: hospital });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};





exports.hospitalSignin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find hospital by email and include password for comparison
        const hospital = await Hospital.findOne({ email }).select('+password');
        if (!hospital) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, hospital.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        // Create JWT token with hospital id and current role
        const token = jwt.sign(
            { id: hospital._id, role: hospital.role }, // this will reflect 'admin' if updated
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Remove password before sending data
        const { password: _, ...hospitalData } = hospital._doc;

        res.status(200).json({
            success: true,
            message: 'Signin successful',
            token,
            data: hospitalData
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};