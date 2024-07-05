import { useState, useEffect } from "react";
import { useAuth } from "../../context/useAuth"; // Import custom hook for authentication context
import DiaryAddProductForm from "../Diary/DiaryAddProductForm"; // Import form component for adding products
import DiaryProductsList from "../Diary/DiaryProductsList"; // Import component for displaying the list of products
import {
  getUserProducts,
  addUserProduct,
  deleteUserProduct,
} from "../../services/diaryService"; // Import service functions for API calls
import styles from "./DiaryPage.module.scss"; // Import CSS module for styling

// Main component for the Diary page
const DiaryPage = () => {
  const { user, token } = useAuth(); // Get the current user and token from the authentication context
  const [products, setProducts] = useState([]); // State to store the list of products
  const [loading, setLoading] = useState(true); // State to handle the loading state
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // State to store the selected date, default is today's date

  // useEffect hook to fetch products when user, date, or token changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getUserProducts(token, date); // Fetch products for the selected date
        console.log("Fetched products:", fetchedProducts); // Log fetched products
        setProducts(fetchedProducts); // Update state with fetched products
        setLoading(false); // Set loading to false after fetching products
      } catch (error) {
        console.error("Error fetching products:", error); // Log any error that occurs during fetching
      }
    };
    fetchProducts(); // Call the fetchProducts function
  }, [user, date, token]);

  // Function to handle adding a product
  const handleAddProduct = async (product) => {
    try {
      const productWithUser = { ...product, date, userId: user.id }; // Include userId and date in the product data
      const newProduct = await addUserProduct(productWithUser, token); // Add the product via API
      setProducts([...products, newProduct]); // Update state with the new product
    } catch (error) {
      console.error("Error adding product:", error); // Log any error that occurs during adding
    }
  };

  // Function to handle deleting a product
  const handleDeleteProduct = async (productId) => {
    try {
      await deleteUserProduct(productId, token); // Delete the product via API
      setProducts(products.filter((product) => product._id !== productId)); // Update state to remove the deleted product
    } catch (error) {
      console.error("Error deleting product:", error); // Log any error that occurs during deleting
    }
  };

  // Show loading message if user data is not available yet
  if (!user) {
    return <div>Loading...</div>;
  }

  // Render the Diary page
  return (
    <div className={styles.diaryPage}>
      <h2>Diary</h2>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)} // Update date state on date change
      />
      <DiaryAddProductForm onSubmit={handleAddProduct} />{" "}
      {/* Form to add products */}
      {loading ? (
        <div>Loading products...</div> // Show loading message while fetching products
      ) : (
        <DiaryProductsList products={products} onDelete={handleDeleteProduct} /> // Show list of products
      )}
    </div>
  );
};

export default DiaryPage;
