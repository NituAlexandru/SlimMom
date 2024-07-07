import mongoose from "mongoose";

// Defining the schema for users
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dailyCalories: {
    type: Number,
    default: 1800,
  },
  nonRecommended: {
    type: [String],
    default: [],
  },
});

// Creating a model from the schema
const User = mongoose.model("User", userSchema);

export default User;
