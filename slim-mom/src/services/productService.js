import api from "./api";

// Function to get all products
export const getProducts = async () => {
  // Making a GET request to the /products endpoint to retrieve all products
  const response = await api.get("/products");
  // Returning the response data which typically contains the list of products
  return response.data;
};

// Function to search for products based on a query
export const searchProducts = async (query) => {
  // Making a GET request to the /products/search endpoint with the query parameter
  const response = await api.get(`/products/search?query=${query}`);
  // Returning the response data which typically contains the search results
  return response.data;
};
