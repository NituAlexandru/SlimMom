import { readDb } from "../utils/fileOperations.js";

// Controller function to handle the calculation of daily calorie intake and retrieving non-recommended products
export const getDailyIntake = async (req, res) => {
  // Extracting user details from the request body
  const { height, weight, age, desiredWeight, bloodType } = req.body;

  // Example calculation logic for daily calorie intake
  const dailyCalories =
    10 * weight + 6.25 * height - 5 * age + (bloodType === 1 ? 5 : -5);

  try {
    // Reading the products data from the database file
    const products = await readDb();
    // Filtering the products to get the list of non-recommended products based on blood type
    const nonRecommended = products.filter(
      (product) => product.groupBloodNotAllowed[bloodType]
    );
    // Sending the calculated daily calories and the list of non-recommended products as a response
    res.json({ dailyCalories, nonRecommended });
  } catch (error) {
    // Sending a 500 response if an error occurs during the calculation
    res.status(500).json({ message: "Error calculating daily intake", error });
  }
};
