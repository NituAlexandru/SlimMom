import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReg } from "../../context/useReg";
import styles from "./Register.module.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [name, setName] = useState(""); // State for name input
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const { register } = useReg(); // Get register function from registration context
  const navigate = useNavigate(); // Hook for navigation

  // Function to validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Function to validate password strength
  const validatePassword = (password) => {
    const re = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{6,}$/;
    return re.test(password);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check if name is at least 8 characters
    if (name.length < 8) {
      toast.error("Name must be at least 8 characters long.");
      return;
    }

    // Check if email is valid
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Check if password meets requirements
    if (!validatePassword(password)) {
      toast.error(
        "Password must be at least 6 characters long, contain one uppercase letter, one number, and one special character."
      );
      return;
    }

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
      console.log("Error Object: ", error);
      console.log("Error Response: ", error.response);

      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "User already exists"
      ) {
        toast.error("Email is already in use. Please use a different email.");
      } else {
        console.error("Register error:", error); // Log any registration error
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className={styles.registerPage}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className={styles.registerForm} noValidate>
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
