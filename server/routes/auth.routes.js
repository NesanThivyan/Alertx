const express = require('express');
const { register, login, getMe,logout } = require('../controllers/auth.controller');
 // Make sure to create this middleware
const { protect } = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/signup', register);
router.post('/signin', login);
router.get('/me', protect, getMe); // Protected route to get current user info
router.post('/logout', protect, logout);

module.exports = router;