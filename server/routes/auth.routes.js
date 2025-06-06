const express = require('express');
const { register, login, getMe,logout } = require('../controllers/auth.controller');
 // Make sure to create this middleware
// const { protect } = require('../middleware/auth.middleware');
const { protect, isAdmin } = require('../middleware/auth.middleware'); // Correct import path and name
const router = express.Router();

router.post('/signup', register);
router.post('/signin', login);
router.get('/me', protect, getMe); // Protected route to get current user info
router.post('/logout', protect, logout);
router.get('/admin-only', protect, isAdmin, (req, res) => {
  res.json({ message: "This is an admin-only route." });
});
module.exports = router;