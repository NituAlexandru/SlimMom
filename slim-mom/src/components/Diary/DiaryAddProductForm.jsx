import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../services/api";
import styles from "./DiaryAddProductForm.module.scss";

const DiaryAddProductForm = ({ onSubmit }) => {
  // State hooks for form fields and search results
  const [productName, setProductName] = useState("");
  const [grams, setGrams] = useState("");
  const [productId, setProductId] = useState("");
  const [weight, setWeight] = useState(100);
  const [calories, setCalories] = useState(0);
  const [searchResults, setSearchResults] = useState([]);

  // Effect hook to search for products when productName changes
  useEffect(() => {
    const searchProducts = async () => {
      if (productName.length > 0) {
        try {
          const response = await api.get(`/products/search`, {
            params: { query: productName },
          });
          setSearchResults(response.data);
        } catch (error) {
          console.error("Error searching products:", error);
        }
      } else {
        setSearchResults([]);
      }
    };
    searchProducts();
  }, [productName]);

  // Handler for input change to update productName state
  const handleInputChange = (e) => {
    const { value } = e.target;
    setProductName(value);
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const product = { productId, productName, grams, weight, calories };
    onSubmit(product); // Call onSubmit with the product details
    // Reset form fields
    setProductName("");
    setGrams("");
    setProductId("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={productName}
        onChange={handleInputChange}
        placeholder="Enter product name"
        required
      />
      <input
        type="number"
        value={grams}
        onChange={(e) => setGrams(e.target.value)}
        placeholder="Grams"
        required
      />
      <button type="submit">+</button>
      {searchResults.length > 0 && (
        <ul className={styles.dropdown}>
          {searchResults.map((product, index) => {
            const key = product._id.$oid || index;
            return (
              <li
                key={key}
                onClick={() => {
                  setProductName(product.title);
                  setProductId(key);
                  setWeight(product.weight);
                  setCalories(product.calories);
                  setSearchResults([]);
                }}
              >
                {product.title}
              </li>
            );
          })}
        </ul>
      )}
    </form>
  );
};

DiaryAddProductForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default DiaryAddProductForm;
