import express from "express";
import { getDailyIntake } from "../controllers/calorieController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to handle getting daily calorie intake (public endpoint)
router.post("/public", getDailyIntake);

// Route to handle getting daily calorie intake for logged-in user
router.post("/user", authMiddleware, getDailyIntake);

export default router;
