import { createContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../services/api";

// Creating the AuthContext to be used for authentication state management
export const AuthContext = createContext();

// Reducer function to manage the authentication state
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": // Handling the login action
      return {
        ...state,
        user: action.payload.user, // Setting the user data
        token: action.payload.token, // Setting the token
      };
    case "LOGOUT": // Handling the logout action
      return {
        ...state,
        user: null, // Clearing the user data
        token: null, // Clearing the token
      };
    default:
      return state;
  }
};

// AuthProvider component to provide the authentication context to its children
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: null,
  }); // Initializing the reducer with the initial state

  // Function to handle login
  const login = async (email, password, calorieCalculation) => {
    try {
      // Sending a POST request to the login endpoint
      const response = await api.post("/auth/login", {
        email,
        password,
        calorieCalculation,
      });
      const { token } = response.data; // Extracting the token from the response

      // Sending a GET request to retrieve user data
      const user = await api.get("/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Dispatching the login action with the user data and token
      dispatch({ type: "LOGIN", payload: { user: user.data, token } });

      // Storing the token in localStorage
      localStorage.setItem("token", token);
    } catch (error) {
      // Logging any login errors
      console.error("Login error:", error);
    }
  };

  // Function to handle logout
  const logout = () => {
    // Dispatching the logout action
    dispatch({ type: "LOGOUT" });

    // Removing the token from localStorage
    localStorage.removeItem("token");
  };

  // useEffect hook to check if a token exists in localStorage on initial render
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchUser = async () => {
        try {
          // Sending a GET request to retrieve user data using the token
          const user = await api.get("/auth/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // Dispatching the login action with the user data and token
          dispatch({ type: "LOGIN", payload: { user: user.data, token } });
        } catch (error) {
          // Logging any errors and removing the token from localStorage if the request fails
          console.error("Fetch user error:", error);
          localStorage.removeItem("token");
        }
      };
      fetchUser(); // Call the fetchUser function
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    // Providing the authentication state and functions to the context's consumers
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Prop types validation for the AuthProvider component
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
