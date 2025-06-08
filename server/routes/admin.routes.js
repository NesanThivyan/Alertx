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
const { protect, isAdmin } = require('../middleware/auth.middleware');

// User management
router.get('/users', protect, isAdmin, getAllUsers);
router.delete('/user/:id', protect, isAdmin, deleteUser);
router.put('/user/:id/role', protect, isAdmin, updateUserRole);

// Caretaker management
router.get('/caretakers', protect, isAdmin, getAllCaretakers);
router.post('/caretaker', protect, isAdmin, addCaretaker);
router.put('/caretaker/:id', protect, isAdmin, updateCaretaker);
router.delete('/caretaker/:id', protect, isAdmin, deleteCaretaker);

module.exports = router;