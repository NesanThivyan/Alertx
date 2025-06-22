import express from 'express';
import {
  getProfile,
  updateProfile,
  deleteAccount
} from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/profile/:id', protect, getProfile);
router.put('/profile/:id', protect, updateProfile);
router.delete('/delete/:id', protect, deleteAccount);

export default router;
