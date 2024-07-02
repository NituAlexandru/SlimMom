import PropTypes from "prop-types";
import DiaryProductsListItem from "./DiaryProductsListItem";
import styles from "./DiaryProductsList.module.scss";

const DiaryProductsList = ({ products, onDelete }) => {
  return (
    <ul className={styles.productList}>
      {products.map((product) => (
        <DiaryProductsListItem
          key={product.id}
          product={product}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

DiaryProductsList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DiaryProductsList;
