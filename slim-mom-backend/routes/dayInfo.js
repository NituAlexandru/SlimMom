import express from "express";
import { getDayInfo } from "../controllers/dayInfoController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router(); // Creating a new router instance

router.use(authMiddleware); // Applying the authentication middleware to all routes in this router

router.get("/:date", getDayInfo); // Route to handle retrieving information for a specific day

export default router; // Exporting the router instance
