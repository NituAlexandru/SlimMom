import PropTypes from "prop-types";
import styles from "./DiaryProductsList.module.scss";

// Component to display the list of consumed products
const DiaryProductsList = ({ products, onDelete }) => {
  return (
    <ul className={styles.productList}>
      {products.map((product, index) => {
        const key = product._id || index; // Unique key for each product
        const quantity = parseFloat(product.quantity); // Convert quantity to a float
        const weight = parseFloat(product.weight); // Convert weight to a float
        const caloriesPer100g = parseFloat(product.calories); // Convert calories to a float
        const caloriesConsumed = (quantity / weight) * caloriesPer100g; // Calculate consumed calories

        return (
          <li key={key}>
            {product.productName} {quantity} g {caloriesConsumed.toFixed(0)}{" "}
            kcal
            <button onClick={() => onDelete(key)}>Delete</button>
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
