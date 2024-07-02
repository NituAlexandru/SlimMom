import styles from "./UserInfo.module.scss";

const UserInfo = () => {
  // Placeholder user info
  const user = {
    name: "John Doe",
    email: "john@example.com",
  };

  return (
    <div className={styles.userInfo}>
      <p>{user.name}</p>
      <p>{user.email}</p>
    </div>
  );
};

export default UserInfo;
