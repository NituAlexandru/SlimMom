import { Link } from "react-router-dom";
import styles from "./Navigation.module.scss";

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/diary">Diary</Link>
        </li>
        <li>
          <Link to="/calculator">Calculator</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
