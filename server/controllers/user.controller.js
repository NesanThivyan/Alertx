// @desc    Get logged in user's profile
// @route   GET /api/user/profile/:id
// @access  Private
exports.getProfile = async (req, res) => {
    const { id } = req.params;

    if (!req.user) {
        return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    if (req.user._id.toString() !== id && req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Unauthorized access' });
    }

    try {
        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Invalid user ID' });
    }
};

// @desc    Update user profile
// @route   PUT /api/user/profile/:id
// @access  Private
exports.updateProfile = async (req, res) => {
    const { id } = req.params;

    if (req.user._id.toString() !== id && req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Unauthorized access' });
    }

    try {
        const updates = req.body;
        const user = await User.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true
        });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, message: 'Profile updated', data: user });
    } catch (error) {
        res.status(422).json({ success: false, message: 'Validation failed', error: error.message });
    }
};

// @desc    Delete user account
// @route   DELETE /api/user/delete/:id
// @access  Private
exports.deleteAccount = async (req, res) => {
    const { id } = req.params;

    if (!req.user) {
        return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    if (req.user._id.toString() !== id && req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Unauthorized access' });
    }

    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'Account not found' });
        }

        res.status(200).json({ success: true, message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};
