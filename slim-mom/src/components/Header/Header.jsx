import Logo from "./Logo";
import Navigation from "./Navigation";
import UserInfo from "./UserInfo";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <Navigation />
      <UserInfo />
    </header>
  );
};

export default Header;
