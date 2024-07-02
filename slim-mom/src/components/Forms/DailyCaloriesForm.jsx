import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./DailyCaloriesForm.module.scss";

const DailyCaloriesForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    age: "",
    desiredWeight: "",
    bloodType: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="number"
        name="height"
        value={formData.height}
        onChange={handleChange}
        placeholder="Height"
        required
      />
      <input
        type="number"
        name="weight"
        value={formData.weight}
        onChange={handleChange}
        placeholder="Weight"
        required
      />
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
        required
      />
      <input
        type="number"
        name="desiredWeight"
        value={formData.desiredWeight}
        onChange={handleChange}
        placeholder="Desired Weight"
        required
      />
      <select
        name="bloodType"
        value={formData.bloodType}
        onChange={handleChange}
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
      </select>
      <button type="submit">Calculate</button>
    </form>
  );
};

DailyCaloriesForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default DailyCaloriesForm;
