import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PropTypes from "prop-types";
import styles from "./Header.module.scss"; // Import your CSS module for styling
import Logo from "./Logo";

const Header = () => {
  const { user, logout } = useAuth(); // Accessing user from the auth context

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoLink}>
        <Logo src={Logo} alt="logo" />
      </Link>
      <nav>
        {user ? (
          <>
            <div className={styles.diaryCalculatorContainer}>
              <Link to="/diary" className={styles.navLink}>
                Diary
              </Link>
              <Link to="/calculator" className={styles.navLink}>
                Calculator
              </Link>
            </div>
            <div className={styles.userContainer}>
              {" "}
              <span className={styles.navLink}>{user.name}</span>
              <hr />
              <button onClick={logout} className={styles.navButton}>
                Exit
              </button>
            </div>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? styles.activeNavLink : styles.navLink
              }
            >
              Log in
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? styles.activeNavLink : styles.navLink
              }
            >
              Register
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

Header.propTypes = {
  logout: PropTypes.func,
};

export default Header;
