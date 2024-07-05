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
    type: String,
    ref: "Product",
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  groupBloodNotAllowed: {
    type: [Boolean],
    required: true,
  },
});

// Creating a model from the schema
const ConsumedProduct = mongoose.model(
  "ConsumedProduct",
  consumedProductSchema
);

export default ConsumedProduct;
