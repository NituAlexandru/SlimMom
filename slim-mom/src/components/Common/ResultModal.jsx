import PropTypes from "prop-types";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; // Importing AuthContext

// The ResultModal component, which displays the calculated daily calorie intake and non-recommended foods.
const ResultModal = ({ isOpen, onRequestClose, result }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Accessing user from AuthContext

  // Function to handle the redirection based on authentication status
  const handleRedirect = () => {
    if (user) {
      navigate("/diary"); // Redirect to DiaryPage if the user is logged in
    } else {
      navigate("/register"); // Redirect to RegisterPage if the user is not logged in
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Your recommended daily calorie intake is</h2>
      <h3>{result.dailyCalories || "N/A"} Calories</h3>
      <h4>Foods you should not eat</h4>
      <ul>
        {result.nonRecommended && result.nonRecommended.length > 0 ? (
          result.nonRecommended.map((food, index) => (
            <li key={index}>{food.title}</li>
          ))
        ) : (
          <li>No specific foods listed</li>
        )}
      </ul>
      <button onClick={handleRedirect}>Start losing weight</button>
    </Modal>
  );
};

// Prop type validation to ensure the component receives the correct props
ResultModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  result: PropTypes.shape({
    dailyCalories: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    nonRecommended: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};

export default ResultModal; // Exports the ResultModal component
