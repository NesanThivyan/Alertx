const express = require('express');
const { register, getMe, logout, login } = require('../controllers/auth.controller');
const { protect, isAdmin, isSuperAdmin } = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/signup', register);
router.post('/signin', login); // handles user and hospital signin based on `type`
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);

router.get('/admin-only', protect, isAdmin, (req, res) => {
  res.json({ message: "This is an admin-only route." });
});

router.get('/superadmin-only', protect, isSuperAdmin, (req, res) => {
  res.json({ message: "This is a superadmin-only route." });
});

module.exports = router;
