import { useState } from "react";
import axios from "axios";

const CalculatorPage = () => {
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    age: "",
    desiredWeight: "",
    bloodType: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/api/calories/public", formData);
    setResult(response.data);
  };

  return (
    <div>
      <h1>Calorie Calculator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="height"
          placeholder="Height"
          value={formData.height}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight"
          value={formData.weight}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="desiredWeight"
          placeholder="Desired Weight"
          value={formData.desiredWeight}
          onChange={handleChange}
          required
        />
        <select
          name="bloodType"
          value={formData.bloodType}
          onChange={handleChange}
          required
        >
          <option value="">Select Blood Type</option>
          <option value="1">Type 1</option>
          <option value="2">Type 2</option>
          <option value="3">Type 3</option>
          <option value="4">Type 4</option>
        </select>
        <button type="submit">Calculate</button>
      </form>
      {result && (
        <div>
          <h2>Daily Calories: {result.dailyCalories}</h2>
          <h3>Non-Recommended Products:</h3>
          <ul>
            {result.nonRecommended.map((product, index) => (
              <li key={index}>{product.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CalculatorPage;
