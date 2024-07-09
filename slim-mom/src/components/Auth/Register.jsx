import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReg } from "../../context/useReg";
import styles from "./Register.module.scss";

const Register = () => {
  const [name, setName] = useState(""); // State for name input
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const { register } = useReg(); // Get register function from registration context
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const calorieCalculation = localStorage.getItem("calorieCalculation"); // Get calorie calculation from localStorage
      let calorieData = {};

      if (calorieCalculation) {
        calorieData = JSON.parse(calorieCalculation); // Parse calorie calculation data
      }

      await register(name, email, password, calorieData); // Call register function with user details and calorie data
      localStorage.removeItem("calorieCalculation"); // Remove calorie calculation from localStorage

      navigate("/calculator"); // Navigate to calculator page
    } catch (error) {
      console.error("Register error:", error); // Log any registration error
    }
  };

  return (
    <div className={styles.registerPage}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className={styles.registerForm}>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update name state on input change
            placeholder="Name *"
          />
        </div>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state on input change
            placeholder="Email *"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state on input change
            placeholder="Password *"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
