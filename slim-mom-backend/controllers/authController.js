import bcrypt from "bcrypt"; // Import bcrypt for hashing passwords
import jwt from "jsonwebtoken"; // Import jsonwebtoken for creating JWTs
import User from "../models/user.js"; // Import the User model
import dotenv from "dotenv"; // Import dotenv to load environment variables

dotenv.config(); // Configuring dotenv to load environment variables

const SECRET_KEY = process.env.SECRET_KEY; // Retrieving the secret key for JWT from environment variables

// Controller function to handle user registration
export const registerUser = async (req, res) => {
  const { name, email, password, dailyCalories, nonRecommended } = req.body; // Destructure the request body
  console.log(
    "Received registration request:",
    name,
    email,
    dailyCalories,
    nonRecommended
  );

  try {
    const existingUser = await User.findOne({ email }); // Check if the user already exists
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" }); // Return a 400 error if the user exists
    }

    const hashedPassword = await bcrypt.hash(password, 12); // Hash the password
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      dailyCalories,
      nonRecommended: Array.from(new Set(nonRecommended)), // Remove duplicate nonRecommended foods
    });

    await newUser.save(); // Save the new user to the database
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      SECRET_KEY,
      { expiresIn: "1h" } // Set token expiration to 1 hour
    );

    console.log("Generated token:", token);
    console.log("New user created:", newUser);

    res.status(201).json({ result: newUser, token }); // Send a 201 response with the new user and token
    console.log("Response sent to frontend:", { result: newUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" }); // Send a 500 error if something goes wrong
  }
};

// Controller function to handle user login
export const loginUser = async (req, res) => {
  const { email, password } = req.body; // Extracting user credentials from the request body
  console.log("Login attempt:", email);
  console.log("SECRET_KEY in authController:", SECRET_KEY);
  try {
    const user = await User.findOne({ email }); // Finding the user with the given email
    console.log("User found:", user);

    if (!user) {
      console.log("User not found:", email);
      return res
        .status(401)
        .json({ message: "Invalid credentials: user not found" }); // Sending a 401 response if the user is not found
    }

    const isMatch = await bcrypt.compare(password, user.password); // Comparing the provided password with the hashed password in the database
    console.log("Password match:", isMatch);

    if (!isMatch) {
      console.log("Password mismatch for user:", email);
      return res
        .status(401)
        .json({ message: "Invalid credentials: password mismatch" }); // Sending a 401 response if the passwords do not match
    }

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h", // Token expiration time set to 1 hour
    });
    console.log("Login successful for user:", email);

    const calorieCalculation = req.body.calorieCalculation;

    if (calorieCalculation) {
      const { dailyCalories, nonRecommended } = calorieCalculation;
      user.dailyCalories = dailyCalories;
      user.nonRecommended = nonRecommended;
      await user.save();
    }

    res.status(200).json({ token }); // Sending a 200 response with the token
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in", error: error.message }); // Sending a 500 response if an error occurs during login
  }
};

// Controller function to handle user logout
export const logoutUser = (req, res) => {
  res.status(200).json({ message: "User logged out successfully" }); // On client side, the token should be removed to "logout" the user
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
