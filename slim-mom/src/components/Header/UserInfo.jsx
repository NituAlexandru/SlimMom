import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./UserInfo.module.scss";

// UserInfo component to display the user's information
const UserInfo = () => {
  // Extracting user data from AuthContext
  const { user } = useContext(AuthContext);

  // If there is no user data, show a message asking to log in
  if (!user) {
    return <div>Please log in</div>;
  }

  // If user data is present, display the user's name and email
  return (
    <div className={styles.userInfo}>
      <p>{user.name}</p>
      <p>{user.email}</p>
    </div>
  );
};

export default UserInfo;
