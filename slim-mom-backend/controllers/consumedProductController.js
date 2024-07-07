import jwt from "jsonwebtoken";
import ConsumedProduct from "../models/consumedProduct.js";

// Function to get userId from token
const getUserIdFromToken = (token) => {
  // Decoding the JWT token to extract the user ID
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  console.log("Decoded token:", decoded);
  return decoded.id; // Returning the user ID from the decoded token
};

// Controller function to handle adding a consumed product
export const addConsumedProduct = async (req, res) => {
  // Destructuring the necessary fields from the request body
  const {
    date,
    productId,
    quantity,
    productName,
    weight,
    calories,
    groupBloodNotAllowed,
  } = req.body;
  // Extracting the token from the authorization header
  const token = req.headers.authorization.split(" ")[1];
  // Getting the user ID from the token
  const userId = getUserIdFromToken(token);

  try {
    // Calculating total calories based on quantity and weight
    const totalCalories = (quantity / weight) * calories;

    // Creating a new consumed product instance with the provided data
    const newConsumedProduct = new ConsumedProduct({
      userId,
      date,
      productId,
      quantity,
      productName,
      weight,
      calories,
      groupBloodNotAllowed,
    });
    // Saving the new consumed product to the database
    await newConsumedProduct.save();
    // Sending a success response with the new consumed product
    res.status(201).json(newConsumedProduct);
  } catch (error) {
    // Sending an error response in case of failure
    res.status(500).json({ message: "Error adding consumed product", error });
  }
};

// Controller function to handle deleting a consumed product
export const deleteConsumedProduct = async (req, res) => {
  const { id } = req.params; // Extracting the product ID from the request parameters
  const token = req.headers.authorization.split(" ")[1]; // Extracting the token from the authorization header
  const userId = getUserIdFromToken(token); // Getting the user ID from the token

  try {
    // Finding and deleting the consumed product by its ID and user ID
    await ConsumedProduct.findOneAndDelete({ _id: id, userId });
    // Sending a success response
    res.status(200).json({ message: "Consumed product deleted" });
  } catch (error) {
    // Sending an error response in case of failure
    res.status(500).json({ message: "Error deleting consumed product", error });
  }
};

// Controller function to handle fetching consumed products by user and date
export const getConsumedProducts = async (req, res) => {
  const { date } = req.params; // Extracting the date from the request parameters
  const token = req.headers.authorization.split(" ")[1]; // Extracting the token from the authorization header
  const userId = getUserIdFromToken(token); // Getting the user ID from the token

  try {
    // Finding consumed products by user ID and date
    const products = await ConsumedProduct.find({ userId, date });
    // Sending a success response with the fetched products
    res.status(200).json(products);
  } catch (error) {
    // Sending an error response in case of failure
    res
      .status(500)
      .json({ message: "Error fetching consumed products", error });
  }
};
