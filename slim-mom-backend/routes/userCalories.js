import express from "express";
import {
  saveDailyIntake,
  getUserDailyIntake,
} from "../controllers/userCalorieController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router(); // Creating a new router instance

router.use(authMiddleware); // Applying the authentication middleware to all routes in this router

router.post("/", saveDailyIntake); // Route to handle saving the user's daily calorie intake

router.get("/", getUserDailyIntake); // Route to handle retrieving the user's daily calorie intake

export default router; // Exporting the router instance
