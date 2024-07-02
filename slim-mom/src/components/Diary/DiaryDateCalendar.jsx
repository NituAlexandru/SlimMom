import PropTypes from "prop-types";
import styles from "./DiaryDateCalendar.module.scss";

const DiaryDateCalendar = ({ selectedDate, onDateChange }) => {
  return (
    <div className={styles.calendar}>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
      />
    </div>
  );
};

DiaryDateCalendar.propTypes = {
  selectedDate: PropTypes.string.isRequired,
  onDateChange: PropTypes.func.isRequired,
};

export default DiaryDateCalendar;
