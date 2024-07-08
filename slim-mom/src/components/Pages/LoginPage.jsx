import LoginForm from "../Auth/Login";
import styles from "./LoginPage.module.scss";

const LoginPage = () => {
  return (
    <div className={styles.logincontainer}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
