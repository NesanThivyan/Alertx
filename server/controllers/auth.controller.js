const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// @desc    Register user
// @route   POST /api/auth/signup
// @access  Public
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Please enter all fields.' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User with this email already exists.' });
        }

        const user = await User.create({
            name,
            email,
            password,
            role // will default to 'user' if not provided
        });

        sendTokenResponse(user, 201, res);

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error during registration', error: error.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/signin
// @access  Public
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please enter email and password' });
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        sendTokenResponse(user, 200, res);

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error during login', error: error.message });
    }
};

// @desc    Log out user
// @route   POST /api/auth/logout
// @access  Private
exports.logout = (req, res) => {
    if (!req.cookies.token) {
        return res.status(401).json({ success: false, message: 'Not logged in' });
    }

    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({ success: true, message: 'Logged out successfully' });
};


// Helper to send JWT token in response
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + 60 * 60 * 20000), // 20 hours
        httpOnly: true
    };

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token,
            role: user.role,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error getting user data', error: error.message });
    }
};