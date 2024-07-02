import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PropTypes from "prop-types"; 
import MainPage from "./components/Pages/MainPage";
import LoginPage from "./components/Pages/LoginPage";
import RegistrationPage from "./components/Pages/RegistrationPage";
import DiaryPage from "./components/Pages/DiaryPage";
import CalculatorPage from "./components/Pages/CalculatorPage";
import AuthProvider, { useAuth } from "./context/AuthContext";
import Header from "./components/Header/Header";
import "./App.module.scss";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};


PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  return (
    <Router>
      <AuthProvider>
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
          <Route path="/calculator" element={<CalculatorPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
