import ConsumedProduct from "../models/consumedProduct.js";

// Controller function to handle retrieving information for a specific day
export const getDayInfo = async (req, res) => {
  // Extracting the date from the request parameters
  const { date } = req.params;
  // Getting the userId from the authenticated user's information
  const userId = req.user.id;

  try {
    // Finding all consumed products for the given userId and date
    const dayInfo = await ConsumedProduct.find({ userId, date });
    // Sending the retrieved information as a response
    res.json(dayInfo);
  } catch (error) {
    // Sending a 500 response if an error occurs during retrieval
    res.status(500).json({ message: "Error retrieving day info", error });
  }
};
