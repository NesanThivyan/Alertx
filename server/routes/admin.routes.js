const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    deleteUser,
    updateUserRole,
    getAllCaretakers,
    addCaretaker,
    updateCaretaker,
    deleteCaretaker
} = require('../controllers/admin.controller');
const { protect, isAdmin ,isSuperAdmin } = require('../middleware/auth.middleware');

// User management
router.get('/users', protect, isAdmin, getAllUsers);
router.delete('/users/:id', protect, isSuperAdmin, deleteUser);
router.put('/users/:id/role', protect, isSuperAdmin, updateUserRole);

// Caretaker management
router.get('/caretakers', protect, isAdmin, getAllCaretakers);
router.post('/caretaker', protect, isAdmin, addCaretaker);
router.put('/caretaker/:id', protect, isAdmin, updateCaretaker);
router.delete('/caretaker/:id', protect, isAdmin, deleteCaretaker);

module.exports = router;