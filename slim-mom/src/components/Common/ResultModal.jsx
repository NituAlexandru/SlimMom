// src/components/Common/ResultModal.jsx
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { updateUserProfile as updateProfileService } from "../../services/authService"; // Importing the updateUserProfile function

const ResultModal = ({ isOpen, onRequestClose, result }) => {
  const navigate = useNavigate(); // Hook for navigation
  const { user, token, updateUserProfile } = useContext(AuthContext); // Get current user from AuthContext

  // Function to get unique categories from the nonRecommended foods
  const uniqueCategories = useCallback(() => {
    const categories = new Set();
    result.nonRecommended.forEach((food) => {
      categories.add(food.categories);
    });
    return Array.from(categories);
  }, [result.nonRecommended]);

  // useEffect to store calorie calculation in localStorage if user is not logged in
  useEffect(() => {
    if (!user && isOpen) {
      localStorage.setItem(
        "calorieCalculation",
        JSON.stringify({
          dailyCalories: result.dailyCalories,
          nonRecommended: uniqueCategories(),
        })
      );
    }
  }, [user, isOpen, result, uniqueCategories]);

  // Function to handle redirect based on user login status
  const handleRedirect = async () => {
    if (user) {
      try {
        console.log("Attempting to update user profile with data:", {
          dailyCalories: result.dailyCalories,
          nonRecommended: uniqueCategories(),
        });
        console.log("Using token:", token);

        const response = await updateProfileService({
          dailyCalories: result.dailyCalories,
          nonRecommended: uniqueCategories(),
        });

        console.log("User profile update response:", response);

        // Update user profile in context
        updateUserProfile({
          ...user,
          dailyCalories: result.dailyCalories,
          nonRecommended: uniqueCategories(),
        });

        navigate("/diary");
      } catch (error) {
        console.error("Error updating user profile:", error);
      }
    } else {
      navigate("/register");
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Your recommended daily calorie intake is</h2>
      <h3>{result.dailyCalories || "N/A"} Calories</h3>
      <h4>Foods you should not eat</h4>
      <ul>
        {result.nonRecommended && result.nonRecommended.length > 0 ? (
          uniqueCategories().map((category, index) => (
            <li key={index}>{category}</li>
          ))
        ) : (
          <li>No specific foods listed</li>
        )}
      </ul>
      <button onClick={handleRedirect}>Start losing weight</button>
    </Modal>
  );
};

ResultModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  result: PropTypes.shape({
    dailyCalories: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    nonRecommended: PropTypes.arrayOf(
      PropTypes.shape({
        categories: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};

export default ResultModal;
