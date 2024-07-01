import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./UserInfo.module.scss";

const UserInfo = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className={styles.userInfo}>
      {user ? (
        <>
          <span>{user.name}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <span>Not logged in</span>
      )}
    </div>
  );
};

export default UserInfo;
