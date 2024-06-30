import mongoose from "mongoose";

// Defining the schema for consumed products
const consumedProductSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: String, // Format: "YYYY-MM-DD"
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

// Creating a model from the schema
const ConsumedProduct = mongoose.model(
  "ConsumedProduct",
  consumedProductSchema
);

export default ConsumedProduct;
