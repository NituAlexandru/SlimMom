import { createContext, useReducer, useContext } from "react";
import PropTypes from "prop-types";
import api from "../services/api";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

// Creating context for registration
export const RegContext = createContext();

// Reducer to manage registration state
const regReducer = (state, action) => {
  switch (action.type) {
    case "REGISTER": // Handling the registration action
      return {
        ...state,
        user: action.payload.user, // Setting the user data
        token: action.payload.token, // Setting the token
      };
    default:
      return state;
  }
};

// RegProvider component to provide the registration context to its children
export const RegProvider = ({ children }) => {
  const [state, dispatch] = useReducer(regReducer, {
    user: null,
    token: null,
  }); // Initializing the reducer with the initial state

  const { login } = useContext(AuthContext); // Accessing the login function from AuthContext

  // Function to handle registration
  const register = async (name, email, password, calorieData) => {
    try {
      // Sending a POST request to the registration endpoint
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
        ...calorieData,
      });

      // Destructuring the token and user from the response data
      const { token, result: user } = response.data;

      // Logging the token for debugging purposes
      // console.log("Token from response:", token);

      // Storing the token in localStorage
      localStorage.setItem("token", token);
      toast.success("Login successful!");
      // Calling the login function to set the authentication state
      await login(email, password);

      // Optionally, setting the registration state (this step might be redundant)
      dispatch({ type: "REGISTER", payload: { user, token } });
    } catch (error) {
      // Logging any registration errors
      console.error("Register error:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    // Providing the registration state and functions to the context's consumers
    <RegContext.Provider value={{ ...state, register }}>
      {children}
    </RegContext.Provider>
  );
};

// Prop types validation for the RegProvider component
RegProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
