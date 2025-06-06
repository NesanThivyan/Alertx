const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    deleteUser,
    updateUserRole,
} = require('../controllers/admin.controller');
const { protect, isAdmin } = require('../middleware/auth.middleware'); // Correct import path and name

router.get('/users', protect, isAdmin, getAllUsers);
router.delete('/user/:id', protect, isAdmin, deleteUser);
router.put('/user/:id/role', protect, isAdmin, updateUserRole);

module.exports = router;