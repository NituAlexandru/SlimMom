import { useAuth } from "../../context/AuthContext";
import DiaryAddProductForm from "../Diary/DiaryAddProductForm";
import DiaryProductsList from "../Diary/DiaryProductsList";
import styles from "./DiaryPage.module.scss";

const DiaryPage = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>; 
  }

  return (
    <div className={styles.diaryPage}>
      <h2>Diary</h2>
      <DiaryAddProductForm userId={user.id} />
      <DiaryProductsList userId={user.id} />
    </div>
  );
};

export default DiaryPage;
