import { useState } from "react";
import api from "../../services/api"; // Folosim api-ul configurat
import CalculatorCalorieForm from "../Forms/CalculatorCalorieForm";
import styles from "./CalculatorPage.module.scss";
import { useAuth } from "../../context/AuthContext";

// CalculatorPage component to display the calorie calculator form and handle its logic
const CalculatorPage = () => {
  const [result, setResult] = useState(null); // State to store the result of the calorie calculation
  const date = new Date().toISOString().slice(0, 10); // Current date
  const { token } = useAuth();

  // Function to handle form submission and make API request
  const handleCalculatorSubmit = async (formData) => {
    try {
      // Making a POST request to the /calories/user endpoint with form data
      const response = await api.post("/calories/user", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
    <div className={styles.calculatorPage}>
      <div className={styles.formSecondContainer}>
        <CalculatorCalorieForm
          onSubmit={handleCalculatorSubmit} // Passing the handleCalculatorSubmit function as a prop
          result={result} // Passing the result state as a prop
          resetResult={resetResult} // Passing the resetResult function as a prop
        />
      </div>
      <div className={styles.rightPane}>
        <div className={styles.summary}>
          <div className={styles.smallsummary}>
            <h3>Summary for {date}</h3>
            <p>
              Left: <span>000 kcal </span>
            </p>
            <p>
              Consumed: <span> 000 kcal</span>
            </p>
            <p>
              Daily rate: <span> 000 kcal</span>
            </p>
            <p>
              n% of normal: <span>000 % </span>
            </p>
          </div>
          <div className={styles.smallsummary}>
            <h3>Food not recommended</h3>
            <p>Your diet will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage; // Exporting the CalculatorPage component
