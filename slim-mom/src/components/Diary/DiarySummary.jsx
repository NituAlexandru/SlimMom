// src/components/Diary/DiarySummary.js
import PropTypes from "prop-types";
import styles from "./DiarySummary.module.scss";

const DiarySummary = ({ date, summary }) => {
  return (
    <div className={styles.summary}>
      <h2>Summary for {date}</h2>
      <p>Left: {Math.round(summary.left)} kcal</p>
      <p>Consumed: {Math.round(summary.consumed)} kcal</p>
      <p>Daily rate: {Math.round(summary.dailyRate)} kcal</p>
      <p>n% of normal: {Number(summary.percentageOfNormal).toFixed(0)} %</p>
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
