import express from "express";
import {
  getProducts,
  searchProducts,
} from "../controllers/productController.js";

const router = express.Router(); // Creating a new router instance

router.get("/", getProducts); // Route to handle retrieving all products
router.get("/search", searchProducts); // Route to handle searching for products based on a query

export default router; // Exporting the router instance
