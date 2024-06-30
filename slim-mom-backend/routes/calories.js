import express from "express";
import { getDailyIntake } from "../controllers/calorieController.js";

const router = express.Router(); // Creating a new router instance

// Route to handle getting daily calorie intake (public endpoint)
router.post("/public", getDailyIntake);

export default router; // Exporting the router instance
