import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./DiaryAddProductForm.module.scss";

const DiaryAddProductForm = ({ onSubmit }) => {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ product, quantity });
    setProduct("");
    setQuantity("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        name="product"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        placeholder="Enter product name"
        required
      />
      <input
        type="number"
        name="quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Enter quantity"
        required
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

DiaryAddProductForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default DiaryAddProductForm;
