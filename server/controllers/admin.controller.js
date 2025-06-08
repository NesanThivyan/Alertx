const User = require('../models/user.model');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Admin
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// @desc    Delete a user by ID
// @route   DELETE /api/admin/user/:id
// @access  Admin
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// @desc    Update a user's role
// @route   PUT /api/admin/user/:id/role
// @access  Admin
exports.updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true, runValidators: true }
        ).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'User role updated', data: user });
    } catch (error) {
        res.status(422).json({ success: false, message: 'Validation failed', error: error.message });
    }
};

// --- Caretaker Management ---

// @desc    Get all caretakers
exports.getAllCaretakers = async (req, res) => {
    try {
        const caretakers = await Caretaker.find();
        res.status(200).json({ success: true, data: caretakers });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// @desc    Add a caretaker
exports.addCaretaker = async (req, res) => {
    try {
        const caretaker = await Caretaker.create(req.body);
        res.status(201).json({ success: true, message: 'Caretaker added', data: caretaker });
    } catch (error) {
        res.status(422).json({ success: false, message: 'Validation failed', error: error.message });
    }
};

// @desc    Update a caretaker
exports.updateCaretaker = async (req, res) => {
    try {
        const caretaker = await Caretaker.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!caretaker) {
            return res.status(404).json({ success: false, message: 'Caretaker not found' });
        }
        res.status(200).json({ success: true, message: 'Caretaker updated', data: caretaker });
    } catch (error) {
        res.status(422).json({ success: false, message: 'Validation failed', error: error.message });
    }
};

// @desc    Delete a caretaker
exports.deleteCaretaker = async (req, res) => {
    try {
        const caretaker = await Caretaker.findByIdAndDelete(req.params.id);
        if (!caretaker) {
            return res.status(404).json({ success: false, message: 'Caretaker not found' });
        }
        res.status(200).json({ success: true, message: 'Caretaker deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};