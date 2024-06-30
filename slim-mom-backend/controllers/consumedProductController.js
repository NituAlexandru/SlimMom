import ConsumedProduct from "../models/consumedProduct.js"; 

// Controller function to handle adding a consumed product
export const addConsumedProduct = async (req, res) => {
  // Extracting the date, productId, and quantity from the request body
  const { date, productId, quantity } = req.body;
  // Getting the userId from the authenticated user's information
  const userId = req.user.id;

  try {
    // Creating a new consumed product instance
    const newConsumedProduct = new ConsumedProduct({
      userId,
      date,
      productId,
      quantity,
    });
    // Saving the new consumed product to the database
    await newConsumedProduct.save();
    // Sending a 201 response with the new consumed product
    res.status(201).json(newConsumedProduct);
  } catch (error) {
    // Sending a 500 response if an error occurs during the addition
    res.status(500).json({ message: "Error adding consumed product", error });
  }
};

// Controller function to handle deleting a consumed product
export const deleteConsumedProduct = async (req, res) => {
  // Extracting the id of the consumed product from the request parameters
  const { id } = req.params;

  try {
    // Finding and deleting the consumed product by id
    await ConsumedProduct.findByIdAndDelete(id);
    // Sending a 200 response indicating the consumed product was deleted
    res.status(200).json({ message: "Consumed product deleted" });
  } catch (error) {
    // Sending a 500 response if an error occurs during the deletion
    res.status(500).json({ message: "Error deleting consumed product", error });
  }
};
