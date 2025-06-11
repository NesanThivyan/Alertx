const express = require('express');
const router = express.Router();
const {
    getProfile,
    updateProfile,
    deleteAccount
} = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');

// Remove the extra 'users' from the path
router.get('/profile/:id', protect, getProfile);
router.put('/profile/:id', protect, updateProfile);
router.delete('/delete/:id', protect, deleteAccount);

module.exports = router;
// filepath: /home/nesanthivyan/Alertx/server/routes/user.routes.js