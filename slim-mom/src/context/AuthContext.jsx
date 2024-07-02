import { createContext, useReducer, useEffect, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: null,
  });

  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const { token } = response.data;
      const user = await axios.get("/api/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "LOGIN", payload: { user: user.data, token } });
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchUser = async () => {
        try {
          const user = await axios.get("/api/auth/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          dispatch({ type: "LOGIN", payload: { user: user.data, token } });
        } catch (error) {
          console.error("Fetch user error:", error);
          localStorage.removeItem("token");
        }
      };
      fetchUser();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
