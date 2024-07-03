import { useState } from "react";
import api from "../../services/api"; // Folosim api-ul configurat
import CalculatorCalorieForm from "../Forms/CalculatorCalorieForm";

// CalculatorPage component to display the calorie calculator form and handle its logic
const CalculatorPage = () => {
  const [result, setResult] = useState(null); // State to store the result of the calorie calculation

  // Function to handle form submission and make API request
  const handleCalculatorSubmit = async (formData) => {
    try {
      // Making a POST request to the /calories/user endpoint with form data
      const response = await api.post("/calories/user", formData);
      // Setting the result state with the response data
      setResult(response.data);
    } catch (error) {
      // Logging any errors that occur during the API request
      console.error("Error calculating daily intake:", error);
    }
  };

  // Function to reset the result state
  const resetResult = () => {
    setResult(null);
  };

  return (
    <div>
      <h1>Calculator</h1>
      <CalculatorCalorieForm
        onSubmit={handleCalculatorSubmit} // Passing the handleCalculatorSubmit function as a prop
        result={result} // Passing the result state as a prop
        resetResult={resetResult} // Passing the resetResult function as a prop
      />
    </div>
  );
};

export default CalculatorPage; // Exporting the CalculatorPage component
