import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router(); // Creating a new router instance

// Route to handle user registration
router.post("/register", registerUser);

// Route to handle user login
router.post("/login", loginUser);

// Route to handle user logout
router.post("/logout", logoutUser);

// Route to get user details
router.get("/user", authMiddleware, getUser);

export default router; 
