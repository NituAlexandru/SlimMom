import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import calorieRoutes from "./routes/calories.js";
import consumedProductRoutes from "./routes/consumedProducts.js";
import dayInfoRoutes from "./routes/dayInfo.js";
import setupSwagger from "./docs/swagger.js";

const app = express(); // Creating an instance of express

app.use(cors()); // Enabling Cross-Origin Resource Sharing for all routes

app.use(bodyParser.json()); // Configuring body-parser to parse JSON request bodies

// Defining route handlers for different endpoints
app.use("/api/auth", authRoutes); // Routes for authentication
app.use("/api/products", productRoutes); // Routes for products
app.use("/api/calories", calorieRoutes); // Routes for calories
app.use("/api/consumed-products", consumedProductRoutes); // Routes for consumed products
app.use("/api/day-info", dayInfoRoutes); // Routes for day info

setupSwagger(app); // Setup Swagger

// Handle 404 errors - route not found
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Handle other errors
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace
  res.status(500).json({ message: "Internal Server Error" });
});

export default app; // Exporting the express app instance
