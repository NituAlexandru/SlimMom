import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Configuring dotenv to load environment variables

const SECRET_KEY = process.env.SECRET_KEY; // Retrieving the secret key for JWT from environment variables

// Middleware function to handle authentication
const authMiddleware = (req, res, next) => {
  // Extracting the token from the Authorization header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" }); // If no token is found, send a 401 response
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verifying the token
    req.user = decoded; // Attaching the decoded user information to the request object
    next(); // Proceeding to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" }); // Sending a 401 response if the token is invalid
  }
};

export default authMiddleware; // Exporting the authentication middleware as the default export
