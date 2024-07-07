import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PropTypes from "prop-types";
import styles from "./Header.module.scss"; // Import your CSS module for styling

const Header = ({ logout }) => {
  const { user } = useAuth(); // Accessing user from the auth context

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img src="/path/to/logo.png" alt="Logo" className={styles.logoImage} />
        <span className={styles.logoText}>SlimMom</span>
      </Link>
      <nav>
        {user ? (
          <>
            <Link to="/diary" className={styles.navLink}>
              Diary
            </Link>
            <Link to="/calculator" className={styles.navLink}>
              Calculator
            </Link>
            <span className={styles.navLink}>{user.name}</span>
            <button onClick={logout} className={styles.navButton}>
              Exit
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.navLink}>
              Log in
            </Link>
            <Link to="/register" className={styles.navLink}>
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Header;
