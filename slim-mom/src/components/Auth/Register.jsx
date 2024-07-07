import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReg } from "../../context/useReg";

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)} // Update name state on input change
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state on input change
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state on input change
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
