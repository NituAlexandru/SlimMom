import { useAuth } from "../../context/useAuth";
import DiaryAddProductForm from "../Diary/DiaryAddProductForm";
import DiaryProductsList from "../Diary/DiaryProductsList";
import styles from "./DiaryPage.module.scss";

// DiaryPage component to display and manage the user's diary
const DiaryPage = () => {
  const { user } = useAuth(); // Using the useAuth hook to access the current user

  // If the user is not available, show a loading message
  if (!user) {
    return <div>Loading...</div>;
  }

  // Render the DiaryPage with the DiaryAddProductForm and DiaryProductsList components
  return (
    <div className={styles.diaryPage}>
      <h2>Diary</h2>
      {/* Passing the userId as a prop to the DiaryAddProductForm component */}
      <DiaryAddProductForm userId={user.id} />
      {/* Passing the userId as a prop to the DiaryProductsList component */}
      <DiaryProductsList userId={user.id} />
    </div>
  );
};

export default DiaryPage; 