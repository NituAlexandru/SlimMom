import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Configuring dotenv to load environment variables

const SECRET_KEY = process.env.SECRET_KEY; // Retrieving the secret key for JWT from environment variables

// Middleware function to handle authentication
const authMiddleware = (req, res, next) => {
  // Extracting the token from the Authorization header
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    // Verifying the token using the secret key
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        // Sending a 401 response if the token is invalid or expired
        return res.status(401).json({ message: "Unauthorized" });
      }
      // Storing the decoded token payload (user information) in the request object
      req.user = decoded;
      // Calling the next middleware function in the stack
      next();
    });
  } else {
    // Sending a 401 response if the token is not provided
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default authMiddleware; // Exporting the authentication middleware as the default export
