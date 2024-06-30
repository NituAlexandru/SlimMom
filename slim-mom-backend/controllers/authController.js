import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config(); // Configuring dotenv to load environment variables

const SECRET_KEY = process.env.SECRET_KEY; // Retrieving the secret key for JWT from environment variables

// Controller function to handle user registration
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body; // Extracting user details from the request body
  try {
    // Checking if a user with the given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" }); // Sending a 400 response if the email is already in use
    }

    // Hashing the user's password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Creating a new user with the hashed password
    const newUser = new User({ name, email, password: hashedPassword });
    // Saving the new user to the database
    const savedUser = await newUser.save();
    // Sending a 201 response with the saved user
    res.status(201).json(savedUser);
  } catch (error) {
    // Sending a 500 response if an error occurs during registration
    res.status(500).json({ message: "Error registering user", error });
  }
};

// Controller function to handle user login
export const loginUser = async (req, res) => {
  const { email, password } = req.body; // Extracting user credentials from the request body
  console.log("Login attempt:", email);
  console.log("SECRET_KEY in authController:", SECRET_KEY);
  try {
    // Finding the user with the given email
    const user = await User.findOne({ email });
    console.log("User found:", user);

    // Sending a 401 response if the user is not found
    if (!user) {
      console.log("User not found:", email);
      return res
        .status(401)
        .json({ message: "Invalid credentials: user not found" });
    }

    // Comparing the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    // Sending a 401 response if the passwords do not match
    if (!isMatch) {
      console.log("Password mismatch for user:", email);
      return res
        .status(401)
        .json({ message: "Invalid credentials: password mismatch" });
    }

    // Creating a JWT token for the authenticated user
    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h", // Token expiration time set to 1 hour
    });
    console.log("Login successful for user:", email);
    // Sending a 200 response with the token
    res.status(200).json({ token });
  } catch (error) {
    // Sending a 500 response if an error occurs during login
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// Controller function to handle user logout
export const logoutUser = (req, res) => {
  // On client side, the token should be removed to "logout" the user
  // You can just send a successful response here
  res.status(200).json({ message: "User logged out successfully" });
};
