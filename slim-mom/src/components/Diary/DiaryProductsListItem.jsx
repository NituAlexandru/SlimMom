import PropTypes from "prop-types";
import styles from "./DiaryProductsListItem.module.scss";

const DiaryProductsListItem = ({ product, onDelete }) => {
  return (
    <li className={styles.productListItem}>
      <span>{product.name}</span>
      <span>{product.quantity}g</span>
      <button onClick={() => onDelete(product.id)}>Delete</button>
    </li>
  );
};

DiaryProductsListItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DiaryProductsListItem;
