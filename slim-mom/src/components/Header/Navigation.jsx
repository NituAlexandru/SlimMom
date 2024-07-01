import { Link } from "react-router-dom";
import styles from "./Navigation.module.scss";

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <Link to="/">Home</Link>
      <Link to="/diary">Diary</Link>
      <Link to="/calculator">Calculator</Link>
    </nav>
  );
};

export default Navigation;
