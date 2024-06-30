import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";

const router = express.Router(); // Creating a new router instance

// Route to handle user registration
router.post("/register", registerUser);

// Route to handle user login
router.post("/login", loginUser);

// Route to handle user logout
router.post("/logout", logoutUser);

export default router; // Exporting the router instance
