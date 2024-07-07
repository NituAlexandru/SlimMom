import { createContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../services/api";

// Creating the AuthContext to be used for authentication state management
export const AuthContext = createContext();

// Reducer function to manage the authentication state
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
    case "UPDATE_PROFILE": // Handling the profile update action
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
  });

  // Function to handle login
  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, user } = response.data;

      dispatch({ type: "LOGIN", payload: { user, token } });
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Function to handle logout
  const logout = async () => {
    try {
      await api.post("/auth/logout");
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Function to update user profile
  const updateUserProfile = (user) => {
    dispatch({ type: "UPDATE_PROFILE", payload: { user, token: state.token } });
  };

  // useEffect hook to check if a token exists in localStorage on initial render
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await api.get("/auth/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const user = response.data;

          dispatch({ type: "LOGIN", payload: { user, token } });
        } catch (error) {
          console.error("Fetch user error:", error);
          localStorage.removeItem("token");
        }
      };
      fetchUser();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...state, login, logout, updateUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Prop types validation for the AuthProvider component
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
