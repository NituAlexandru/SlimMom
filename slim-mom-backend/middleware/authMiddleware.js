import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Loading environment variables from a .env file

const SECRET_KEY = process.env.SECRET_KEY; // Getting the secret key from environment variables

// Middleware function to handle authentication
const authMiddleware = (req, res, next) => {
  // Extracting the token from the Authorization header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // If no token is provided, respond with an authorization error
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verifying the token and extracting the user data
    const decoded = jwt.verify(token, SECRET_KEY);
    // console.log("Decoded user data from token:", decoded); // Logging the decoded token data
    req.user = decoded; // Attaching the decoded user data to the request object
    next(); // Passing control to the next middleware function
  } catch (error) {
    // Logging and responding with an error if token verification fails
    console.log("Token verification error:", error);
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;
