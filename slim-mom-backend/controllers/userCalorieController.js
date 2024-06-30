import UserCalorie from "../models/userCalorie.js";

// Controller function to handle saving the user's daily calorie intake
export const saveDailyIntake = async (req, res) => {
  // Extracting dailyCalories and nonRecommended from the request body
  const { dailyCalories, nonRecommended } = req.body;
  // Getting the userId from the authenticated user's information
  const userId = req.user.id;

  try {
    // Creating a new user calorie intake instance
    const newUserCalorie = new UserCalorie({
      userId,
      dailyCalories,
      nonRecommended,
    });
    // Saving the new user calorie intake to the database
    await newUserCalorie.save();
    // Sending a 201 response with the new user calorie intake
    res.status(201).json(newUserCalorie);
  } catch (error) {
    // Sending a 500 response if an error occurs during the save operation
    res.status(500).json({ message: "Error saving daily intake", error });
  }
};

// Controller function to handle retrieving the user's daily calorie intake
export const getUserDailyIntake = async (req, res) => {
  // Getting the userId from the authenticated user's information
  const userId = req.user.id;

  try {
    // Finding the user's daily calorie intake by userId
    const userCalorie = await UserCalorie.findOne({ userId });
    // Sending the retrieved daily calorie intake as a response
    res.json(userCalorie);
  } catch (error) {
    // Sending a 500 response if an error occurs during the retrieval
    res.status(500).json({ message: "Error retrieving daily intake", error });
  }
};
