import express from "express";
import {
  getProfile,
  updateProfile,
  deleteAccount,
  createOrUpdateUserDetails,  // updated function name for create or update user details
  getUserDetails,
  updateUserDetails,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Profile routes
router.get("/profile/:id", protect, getProfile);
router.put("/profile/:id", protect, updateProfile);
router.delete("/delete/:id", protect, deleteAccount);

// User details routes
// Create or update details (POST) and update details (PUT), get details (GET)
router.post("/users/:id/details", protect, createOrUpdateUserDetails);
router.put("/users/:id/details", protect, updateUserDetails);
router.get("/users/:id/details", protect, getUserDetails);

export default router;
