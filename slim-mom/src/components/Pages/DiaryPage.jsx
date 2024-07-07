import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/useAuth";
import DiaryAddProductForm from "../Diary/DiaryAddProductForm";
import DiaryProductsList from "../Diary/DiaryProductsList";
import DiarySummary from "../Diary/DiarySummary";
import {
  getUserProducts,
  addUserProduct,
  deleteUserProduct,
} from "../../services/diaryService";
import styles from "./DiaryPage.module.scss";

// Main component for the Diary page
const DiaryPage = () => {
  const { user, token } = useAuth(); // Get the current user and token from the authentication context
  const [products, setProducts] = useState([]); // State to store the list of products
  const [loading, setLoading] = useState(true); // State to handle the loading state
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // State to store the selected date, default is today's date
  const [summary, setSummary] = useState({
    left: 0,
    consumed: 0,
    dailyRate: 0,
    percentageOfNormal: 0,
    nonRecommended: [],
  }); // State to store the summary of calorie intake

  // Function to calculate the summary of calorie intake
  const calculateSummary = useCallback(
    (products, dailyRate) => {
      const consumed = products.reduce((acc, product) => {
        return acc + (product.quantity / product.weight) * product.calories;
      }, 0); // Calculate total consumed calories
      const left = dailyRate - consumed; // Calculate remaining calories
      const percentageOfNormal = ((consumed / dailyRate) * 100).toFixed(2); // Calculate percentage of daily rate consumed
      return {
        left,
        consumed,
        dailyRate,
        percentageOfNormal: Number(percentageOfNormal),
        nonRecommended: user.nonRecommended || [], // Get non-recommended foods
      };
    },
    [user.nonRecommended]
  );

  // useEffect hook to fetch products when user, date, or token changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getUserProducts(token, date); // Fetch products for the selected date
        console.log("Fetched products:", fetchedProducts); // Log fetched products
        setProducts(fetchedProducts); // Update state with fetched products
        setLoading(false); // Set loading to false after fetching products

        const dailyRate = user.dailyCalories || 2000; // Default to 2000 if not set
        setSummary(calculateSummary(fetchedProducts, dailyRate)); // Calculate and set summary
      } catch (error) {
        console.error("Error fetching products:", error); // Log any error that occurs during fetching
      }
    };
    fetchProducts(); // Call the fetchProducts function
  }, [user, date, token, calculateSummary]); // Dependencies array for useEffect

  // Function to handle adding a product
  const handleAddProduct = async (product) => {
    try {
      const productWithUser = { ...product, date, userId: user.id }; // Include userId and date in the product data
      const newProduct = await addUserProduct(productWithUser, token); // Add the product via API
      const updatedProducts = [...products, newProduct]; // Update state with the new product
      setProducts(updatedProducts); // Update state with the updated product list

      const dailyRate = user.dailyCalories || 2000; // Default to 2000 if not set
      setSummary(calculateSummary(updatedProducts, dailyRate)); // Calculate and set summary
    } catch (error) {
      console.error("Error adding product:", error); // Log any error that occurs during adding
    }
  };

  // Function to handle deleting a product
  const handleDeleteProduct = async (productId) => {
    try {
      await deleteUserProduct(productId, token); // Delete the product via API
      const updatedProducts = products.filter(
        (product) => product._id !== productId
      ); // Update state to remove the deleted product
      setProducts(updatedProducts); // Update state with the updated product list

      const dailyRate = user.dailyCalories || 2000; // Default to 2000 if not set
      setSummary(calculateSummary(updatedProducts, dailyRate)); // Calculate and set summary
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
      <div className={styles.leftPane}>
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
          <DiaryProductsList
            products={products}
            onDelete={handleDeleteProduct} // Pass delete handler to the list component
          />
        )}
      </div>
      <div className={styles.rightPane}>
        <DiarySummary date={date} summary={summary} />{" "}
        {/* Display the summary */}
      </div>
    </div>
  );
};

export default DiaryPage;
