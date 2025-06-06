const express = require('express');
const router = express.Router();
const {
   
    getProfile,
    updateProfile,
    deleteAccount
} = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');


router.get('/user/profile/:id', protect, getProfile);
router.put('/user/profile/:id', protect, updateProfile);
router.delete('/user/delete/:id', protect, deleteAccount);

module.exports = router;
