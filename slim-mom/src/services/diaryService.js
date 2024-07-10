import api from "./api"; // Importing the API configuration
import { toast } from "react-toastify";

// Function to get products consumed by the user on a specific date
export const getUserProducts = async (token, date) => {
  try {
    // Sending a GET request to the API to fetch consumed products for a specific date
    const response = await api.get(`/consumed-products/${date}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Adding the authorization token to the request headers
        "Content-Type": "application/json", // Specifying the content type as JSON
      },
    });
    return response.data; // Returning the data from the response
  } catch (error) {
    console.error("Error in getUserProducts:", error); // Logging any errors that occur
    throw error; // Throwing the error to be handled by the caller
  }
};

// Function to add a product to the user's consumed list
export const addUserProduct = async (product, token) => {
  // Sending a POST request to the API to add a new consumed product
  const response = await api.post(
    `/consumed-products`,
    {
      ...product, // Spreading the product object to include all its properties
      quantity: product.grams,
      productName: product.productName,
      userId: product.userId,
      weight: product.weight,
      calories: product.calories,
      groupBloodNotAllowed: product.groupBloodNotAllowed, // Including blood group restrictions
    },
    {
      headers: {
        Authorization: `Bearer ${token}`, // Adding the authorization token to the request headers
        "Content-Type": "application/json", // Specifying the content type as JSON
      },
    }
  );
  toast.success("Product added successfully!");
  return response.data; // Returning the data from the response
};

// Function to delete a product from the user's consumed list
export const deleteUserProduct = async (productId, token) => {
  // Sending a DELETE request to the API to delete a consumed product by its ID
  await api.delete(`/consumed-products/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Adding the authorization token to the request headers
    },
  });
  toast.success("Product deleted successfully!");
};
