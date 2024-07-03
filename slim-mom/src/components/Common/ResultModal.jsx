import PropTypes from "prop-types";
import Modal from "react-modal";

// The ResultModal component, which displays the calculated daily calorie intake and non-recommended foods.
const ResultModal = ({ isOpen, onRequestClose, result }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Your recommended daily calorie intake is</h2>
      <h3>{result.dailyCalories || "N/A"} Calories</h3>{" "}
      {/* Displays the daily calorie intake or "N/A" if not available */}
      <h4>Foods you should not eat</h4>
      <ul>
        {result.nonRecommended && result.nonRecommended.length > 0 ? ( // Checks if there are non-recommended foods
          result.nonRecommended.map((food, index) => (
            <li key={index}>{food.title}</li> // Lists each non-recommended food
          ))
        ) : (
          <li>No specific foods listed</li> // Displays if no non-recommended foods are listed
        )}
      </ul>
      <button onClick={onRequestClose}>Start losing weight</button>{" "}
      {/* Button to close the modal */}
    </Modal>
  );
};

// Prop type validation to ensure the component receives the correct props
ResultModal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Indicates if the modal is open
  onRequestClose: PropTypes.func.isRequired, // Function to close the modal
  result: PropTypes.shape({
    dailyCalories: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // Daily calorie intake, either number or string
    nonRecommended: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired, // Title of the non-recommended food
      })
    ),
  }).isRequired,
};

export default ResultModal; // Exports the ResultModal component
