import Register from "../Auth/Register";
import styles from "./RegistrationPage.module.scss";

const RegistrationPage = () => {
  return (
    <div className={styles.registerContainer}>
      <Register />
    </div>
  );
};

export default RegistrationPage;
