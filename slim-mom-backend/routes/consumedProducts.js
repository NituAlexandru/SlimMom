import express from "express";
import {
  addConsumedProduct,
  deleteConsumedProduct,
  getConsumedProducts,
} from "../controllers/consumedProductController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router(); // Creating a new router instance

router.use(authMiddleware); // Applying the authentication middleware to all routes in this router
router.post("/", addConsumedProduct); // Route to handle adding a consumed product
router.delete("/:id", deleteConsumedProduct); // Route to handle deleting a consumed product by its ID
router.get("/:date", getConsumedProducts); // Route to handle fetching consumed products by date

export default router; // Exporting the router instance
