// src/components/Diary/DiarySummary.js
import PropTypes from "prop-types";
import styles from "./DiarySummary.module.scss";

const DiarySummary = ({ date, summary }) => {
  return (
    <div className={styles.summary}>
      <h2>Summary for {date}</h2>
      <p>Left: {summary.left} kcal</p>
      <p>Consumed: {summary.consumed} kcal</p>
      <p>Daily rate: {summary.dailyRate} kcal</p>
      <p>n% of normal: {summary.percentageOfNormal} %</p>
      <h3>Food not recommended</h3>
      <ul>
        {summary.nonRecommended.map((food, index) => (
          <li key={index}>{food}</li>
        ))}
      </ul>
    </div>
  );
};

DiarySummary.propTypes = {
  date: PropTypes.string.isRequired,
  summary: PropTypes.shape({
    left: PropTypes.number.isRequired,
    consumed: PropTypes.number.isRequired,
    dailyRate: PropTypes.number.isRequired,
    percentageOfNormal: PropTypes.number.isRequired,
    nonRecommended: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default DiarySummary;
