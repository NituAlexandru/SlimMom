import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config(); // Configuring dotenv to load environment variables

const SECRET_KEY = process.env.SECRET_KEY; // Retrieving the secret key for JWT from environment variables

// Controller function to handle user registration
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Received registration request:", name, email);

  try {
    const existingUser = await User.findOne({ email }); // Checking if the user already exists
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" }); // If user exists, send a 400 response
    }

    const hashedPassword = await bcrypt.hash(password, 12); // Hashing the password
    const newUser = new User({ name, email, password: hashedPassword }); // Creating a new user instance

    await newUser.save(); // Saving the new user to the database

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      SECRET_KEY,
      { expiresIn: "1h" } // Token expiration time set to 1 hour
    );

    console.log("Generated token:", token); // Log the generated token
    console.log("New user created:", newUser); // Log the new user

    res.status(201).json({ result: newUser, token }); // Sending a 201 response with the user and token
    console.log("Response sent to frontend:", { result: newUser, token }); // Logging the response sent to frontend
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" }); // Sending a 500 response if an error occurs
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

// Controller function to get user details
export const getUser = async (req, res) => {
  try {
    const userId = req.user.id; // Extracting the user ID from the request
    const user = await User.findById(userId).select("-password"); // Finding the user by ID and excluding the password field
    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Sending a 404 response if the user is not found
    }
    res.json(user); // Sending the user data as the response
  } catch (error) {
    console.error("Error getting user:", error); // Logging the error
    res.status(500).json({ message: "Internal Server Error" }); // Sending a 500 response if an error occurs
  }
};
