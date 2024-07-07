import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import PropTypes from "prop-types";
import styles from "./Header.module.scss";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <nav>
        {user ? (
          <>
            <Link to="/diary">Diary</Link>
            <Link to="/calculator">Calculator</Link>
            <span>{user.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
};

export default Header;
