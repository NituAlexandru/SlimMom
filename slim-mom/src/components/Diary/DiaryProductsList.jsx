import PropTypes from "prop-types";
import styles from "./DiaryProductsList.module.scss";

// Component to display the list of consumed products
const DiaryProductsList = ({ products, onDelete }) => {
  return (
    <ul className={styles.productList}>
      {products.map((product, index) => {
        const key = product._id || index;
        const quantity = parseFloat(product.quantity);
        const weight = parseFloat(product.weight);
        const caloriesPer100g = parseFloat(product.calories);
        const caloriesConsumed = (quantity / weight) * caloriesPer100g;

        return (
          <li key={key} className={styles.productItem}>
            <span
              className={styles.productName}
              data-fullname={product.productName}
            >
              {product.productName}
            </span>
            <span className={styles.productQuantity}>{quantity} g</span>
            <span className={styles.productCalories}>
              {caloriesConsumed.toFixed(0)} kcal
            </span>
            <button
              className={styles.deleteButton}
              onClick={() => onDelete(key)}
            >
              &#x2716;
            </button>
          </li>
        );
      })}
    </ul>
  );
};

DiaryProductsList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
      productName: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      weight: PropTypes.number, // Weight of the product per 100 grams
      calories: PropTypes.number, // Calories per 100 grams
      groupBloodNotAllowed: PropTypes.arrayOf(PropTypes.bool), // Array of booleans for blood group restrictions
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired, // Function to handle delete action
};

export default DiaryProductsList;
