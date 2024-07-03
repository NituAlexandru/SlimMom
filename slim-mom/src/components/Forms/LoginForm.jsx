import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { login } from "../../services/authService";
import styles from "./LoginForm.module.scss";

// LoginForm component handles the user login form
const LoginForm = () => {
  // useState hooks to manage the email and password state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Extracting the login function from AuthContext to update the context after login
  const { login: loginContext } = useAuth();

  // handleSubmit function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Attempt to login with provided email and password
      const { token, user } = await login(email, password);
      // If successful, update the AuthContext with the user and token
      loginContext(user, token);
    } catch (error) {
      // Log any errors that occur during login
      console.error("Login failed:", error);
    }
  };

  return (
    // Form element with onSubmit event handler
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
