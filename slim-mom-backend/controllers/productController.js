import { readDb } from "../utils/fileOperations.js"; 

// Controller function to handle retrieving all products
export const getProducts = async (req, res) => {
  try {
    // Reading the products data from the database file
    const products = await readDb();
    // Sending the retrieved products as a response
    res.json(products);
  } catch (error) {
    // Sending a 500 response if an error occurs during retrieval
    res.status(500).json({ message: "Error getting products", error });
  }
};

// Controller function to handle searching for products by a query
export const searchProducts = async (req, res) => {
  // Extracting the search query from the request query parameters
  const { query } = req.query;

  try {
    // Reading the products data from the database file
    const products = await readDb();
    // Filtering the products based on the search query
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    // Sending the filtered products as a response
    res.json(filteredProducts);
  } catch (error) {
    // Sending a 500 response if an error occurs during search
    res.status(500).json({ message: "Error searching products", error });
  }
};
