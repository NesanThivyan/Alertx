const express = require('express');
const { register, login, getMe } = require('../controllers/auth.controller');
 // Make sure to create this middleware
const { protect } = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/signup', register);
router.post('/signin', login);
router.get('/me', protect, getMe); // Protected route to get current user info

module.exports = router;