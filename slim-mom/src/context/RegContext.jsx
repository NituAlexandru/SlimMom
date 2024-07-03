import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import api from "../services/api";

// Creating the RegContext to be used for registration state management
export const RegContext = createContext();

// Reducer function to manage the registration state
const regReducer = (state, action) => {
  switch (action.type) {
    case "REGISTER": // Handling the register action
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
  });

  // Function to handle registration
  const register = async (name, email, password) => {
    try {
      // Sending a POST request to the registration endpoint
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      // Destructuring token and user from the response data
      const { token, result: user } = response.data;

      // Logging the token to the console for debugging purposes
      console.log("Token from response:", token);

      // Storing the token in localStorage
      localStorage.setItem("token", token);

      // Dispatching the register action with the user data and token
      dispatch({ type: "REGISTER", payload: { user, token } });
    } catch (error) {
      // Logging any registration errors
      console.error("Register error:", error);
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
