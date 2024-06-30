import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config(); // Configuring dotenv to load environment variables

const PORT = process.env.PORT || 5000; // Setting the port from environment variables or defaulting to 5000
const DB_URI = process.env.DB_URI; // Retrieving the MongoDB URI from environment variables

// Connecting to the MongoDB database using mongoose
mongoose
  .connect(DB_URI)
  .then(() => {
    // Starting the server after a successful database connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    // Logging any errors that occur during the database connection
    console.log("Database connection error:", error);
  });
