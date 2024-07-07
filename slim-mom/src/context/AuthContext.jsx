import { createContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../services/api";

// Creating the AuthContext to be used for authentication state management
export const AuthContext = createContext();

// Reducer function to manage the authentication state
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": // Handling the login action
      console.log("LOGIN action dispatched", action.payload);
      return {
        ...state,
        user: action.payload.user, // Setting the user data
        token: action.payload.token, // Setting the token
      };
    case "LOGOUT": // Handling the logout action
      console.log("LOGOUT action dispatched");
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
  });

  // Function to handle login
  const login = async (email, password) => {
    try {
      // Sending a POST request to the login endpoint
      const response = await api.post("/auth/login", { email, password });
      const { token } = response.data; // Extracting the token from the response

      console.log("Response data from login", response.data);

      // Fetch user data from server
      const userResponse = await api.get("/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = userResponse.data;

      // Dispatching the login action with the user data and token
      dispatch({ type: "LOGIN", payload: { user, token } });

      // Storing the token in localStorage
      localStorage.setItem("token", token);
      console.log("Token and user set in localStorage and state", token, user);
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
    console.log("Token removed from localStorage");
  };

  // useEffect hook to check if a token exists in localStorage on initial render
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchUser = async () => {
        try {
          // Fetch user data from server
          const userResponse = await api.get("/auth/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const user = userResponse.data;

          // Dispatching the login action with the user data and token
          dispatch({ type: "LOGIN", payload: { user, token } });
          console.log("Fetched user data from token", user);
        } catch (error) {
          // Logging any errors and removing the token from localStorage if the request fails
          console.error("Fetch user error:", error);
          localStorage.removeItem("token");
        }
      };
      fetchUser();
    }
  }, []);

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
