import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./CalculatorCalorieForm.module.scss";
import ResultModal from "../Common/ResultModal";

// CalculatorCalorieForm component handles the form for inputting user data to calculate daily calorie intake.
const CalculatorCalorieForm = ({ onSubmit, result, resetResult }) => {
  // useState hook to manage form data state
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    age: "",
    desiredWeight: "",
    bloodType: 1,
  });

  // handleChange function updates formData state when input fields change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // handleRadioChange function updates the bloodType state when radio buttons change
  const handleRadioChange = (e) => {
    setFormData({
      ...formData,
      bloodType: parseInt(e.target.value, 10),
    });
  };

  // handleSubmit function prevents default form submission and calls onSubmit with formData
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div>
      <h2>
        Calculate your daily calorie <br /> intake right now
      </h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleChange}
          placeholder="Height *"
          required
        />
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          placeholder="Weight *"
          required
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age *"
          required
        />
        <input
          type="number"
          name="desiredWeight"
          value={formData.desiredWeight}
          onChange={handleChange}
          placeholder="Desired Weight *"
          required
        />
        <div className={styles.bloodTypeSection}>
          <label>Blood Type *</label>
          <div className={styles.radioButtons}>
            <label>
              <input
                type="radio"
                name="bloodType"
                value={1}
                checked={formData.bloodType === 1}
                onChange={handleRadioChange}
              />
              1
            </label>
            <label>
              <input
                type="radio"
                name="bloodType"
                value={2}
                checked={formData.bloodType === 2}
                onChange={handleRadioChange}
              />
              2
            </label>
            <label>
              <input
                type="radio"
                name="bloodType"
                value={3}
                checked={formData.bloodType === 3}
                onChange={handleRadioChange}
              />
              3
            </label>
            <label>
              <input
                type="radio"
                name="bloodType"
                value={4}
                checked={formData.bloodType === 4}
                onChange={handleRadioChange}
              />
              4
            </label>
          </div>
        </div>
        <button type="submit">Start losing weight</button>
      </form>
      {result && (
        <ResultModal
          isOpen={true}
          onRequestClose={resetResult}
          result={result}
        />
      )}
    </div>
  );
};

// Prop type validation to ensure the component receives the correct props
CalculatorCalorieForm.propTypes = {
  onSubmit: PropTypes.func.isRequired, // Function to handle form submission
  result: PropTypes.object, // Object containing the result data
  resetResult: PropTypes.func.isRequired, // Function to reset the result state
};

export default CalculatorCalorieForm; // Exports the CalculatorCalorieForm component
