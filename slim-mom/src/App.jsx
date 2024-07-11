import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import PropTypes from "prop-types";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Header from "./components/Header/Header";
import MainPage from "./components/Pages/MainPage";
import LoginPage from "./components/Pages/LoginPage";
import RegistrationPage from "./components/Pages/RegistrationPage";
import DiaryPage from "./components/Pages/DiaryPage";
import CalculatorPage from "./components/Pages/CalculatorPage";
import NotFound from "./components/Pages/NotFound";
import { RegProvider } from "./context/RegContext";
import Modal from "react-modal";
import { useEffect } from "react";
import styles from "./App.module.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// Setting the root element for modals to ensure accessibility
Modal.setAppElement("#root");

// PrivateRoute component to protect routes that require authentication
const PrivateRoute = ({ children }) => {
  const { user } = useAuth(); // Accessing user from the auth context
  const location = useLocation();

  useEffect(() => {
    if (user) {
      localStorage.setItem("lastPath", location.pathname);
    }
  }, [user, location]);

  // If user is authenticated, render the children components, otherwise redirect to login
  return user ? children : <Navigate to="/login" />;
};

// Type checking for PrivateRoute component props
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

// PublicRoute component to protect routes that should only be accessible to unauthenticated users
const PublicRoute = ({ children }) => {
  const { user } = useAuth(); // Accessing user from the auth context
  const lastPath = localStorage.getItem("lastPath");
  return user ? <Navigate to={lastPath || "/diary"} /> : children;
};

// Type checking for PublicRoute component props
PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

// Main App component that sets up the routing
function App() {
  useEffect(() => {
    const lastPath = localStorage.getItem("lastPath");
    if (lastPath && lastPath !== window.location.pathname) {
      window.location.pathname = lastPath;
    }
  }, []);

  return (
    <Router>
      <AuthProvider>
        <RegProvider>
          <div className={styles.app}>
            <Header />
            <div className={styles.content}>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <LoginPage className={styles.logincontainer} />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <PublicRoute>
                      <RegistrationPage />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/diary"
                  element={
                    <PrivateRoute>
                      <DiaryPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/calculator"
                  element={
                    <PrivateRoute>
                      <CalculatorPage />
                    </PrivateRoute>
                  }
                />{" "}
                <Route path="*" element={<NotFound />} />{" "}
                {/* Ruta pentru pagina NotFound */}
              </Routes>
              <ToastContainer />
            </div>
          </div>
        </RegProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
