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
  const { user, token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [summary, setSummary] = useState({
    left: 0,
    consumed: 0,
    dailyRate: 0,
    percentageOfNormal: 0,
    nonRecommended: [],
  });

  const calculateSummary = useCallback(
    (products, dailyRate) => {
      const consumed = products.reduce((acc, product) => {
        return acc + (product.quantity / product.weight) * product.calories;
      }, 0);
      const left = dailyRate - consumed;
      const percentageOfNormal = ((consumed / dailyRate) * 100).toFixed(2);
      return {
        left,
        consumed,
        dailyRate,
        percentageOfNormal: Number(percentageOfNormal),
        nonRecommended: user.nonRecommended || [],
      };
    },
    [user.nonRecommended]
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getUserProducts(token, date);
        console.log("Fetched products:", fetchedProducts);
        setProducts(fetchedProducts);
        setLoading(false);

        const dailyRate = user.dailyCalories || 2000; // Default to 2000 if not set
        setSummary(calculateSummary(fetchedProducts, dailyRate));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    if (user) {
      fetchProducts();
    }
  }, [user, date, token, calculateSummary]);

  const handleAddProduct = async (product) => {
    try {
      const productWithUser = { ...product, date, userId: user.id };
      const newProduct = await addUserProduct(productWithUser, token);
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);

      const dailyRate = user.dailyCalories || 2000;
      setSummary(calculateSummary(updatedProducts, dailyRate));
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteUserProduct(productId, token);
      const updatedProducts = products.filter(
        (product) => product._id !== productId
      );
      setProducts(updatedProducts);

      const dailyRate = user.dailyCalories || 2000;
      setSummary(calculateSummary(updatedProducts, dailyRate));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.diaryPage}>
      <div className={styles.leftPane}>
        <h2>Diary</h2>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <DiaryAddProductForm onSubmit={handleAddProduct} />
        {loading ? (
          <div>Loading products...</div>
        ) : (
          <DiaryProductsList
            products={products}
            onDelete={handleDeleteProduct}
          />
        )}
      </div>
      <div className={styles.rightPane}>
        <DiarySummary date={date} summary={summary} />
      </div>
    </div>
  );
};

export default DiaryPage;
