import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PropTypes from "prop-types";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header/Header";
import MainPage from "./components/Pages/MainPage";
import LoginPage from "./components/Pages/LoginPage";
import RegistrationPage from "./components/Pages/RegistrationPage";
import DiaryPage from "./components/Pages/DiaryPage";
import CalculatorPage from "./components/Pages/CalculatorPage";
import { useAuth } from "./context/useAuth";
import { RegProvider } from "./context/RegContext";
import Modal from "react-modal";

// Setting the root element for modals to ensure accessibility
Modal.setAppElement("#root");

// PrivateRoute component to protect routes that require authentication
const PrivateRoute = ({ children }) => {
  const { user } = useAuth(); // Accessing user from the auth context
  // If user is authenticated, render the children components, otherwise redirect to login
  return user ? children : <Navigate to="/login" />;
};

// Type checking for PrivateRoute component props
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

// Main App component that sets up the routing
function App() {
  return (
    <Router>
      <AuthProvider>
        <RegProvider>
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
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
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </RegProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
