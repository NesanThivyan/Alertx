const express = require('express');
const { register, login, getMe,logout } = require('../controllers/auth.controller');
 // Make sure to create this middleware
// const { protect } = require('../middleware/auth.middleware');
const { protect, isAdmin , isSuperAdmin } = require('../middleware/auth.middleware'); // Correct import path and name
const router = express.Router();
const { hospitalSignup } = require('../controllers/hospital.controller'); // <-- add this line

router.post('/signup', register , hospitalSignup); // No auth needed for signup
router.post('/signin', login);
router.get('/me', protect, getMe); // Protected route to get current user info
router.post('/logout', protect, logout);
router.get('/admin-only', protect, isAdmin, (req, res) => {
  res.json({ message: "This is an admin-only route." });
});
router.get('/superadmin-only', protect, isSuperAdmin, (req, res) => {
  res.json({ message: "This is a superadmin-only route." });
});
module.exports = router;