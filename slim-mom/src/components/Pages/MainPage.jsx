import { useState } from "react";
// Folosim api-ul configurat
import CalculatorCalorieForm from "../Forms/CalculatorCalorieForm";
import api from "../../services/api";

// MainPage component to display the calorie calculator form and handle its logic
const MainPage = () => {
  const [result, setResult] = useState(null); // Using useState hook to manage the result state

  // Function to handle the form submission
  const handleCalculatorSubmit = async (formData) => {
    try {
      // Making a POST request to the public calorie calculation endpoint
      const response = await api.post("/calories/public", formData);
      // Setting the result state with the response data
      setResult(response.data);
    } catch (error) {
      // Logging the error in case the request fails
      console.error("Error calculating daily intake:", error);
    }
  };

  // Function to reset the result state
  const resetResult = () => {
    setResult(null);
  };

  return (
    <div>
      <h1>Calculate your daily calorie intake right now</h1>
      {/* Rendering the CalculatorCalorieForm component */}
      <CalculatorCalorieForm
        onSubmit={handleCalculatorSubmit} // Passing the form submission handler
        result={result} // Passing the result state
        resetResult={resetResult} // Passing the function to reset the result
      />
    </div>
  );
};

export default MainPage;
