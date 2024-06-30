import mongoose from "mongoose";

// Defining the schema for user's daily calorie intake
const userCalorieSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dailyCalories: {
    type: Number,
    required: true,
  },
  nonRecommended: {
    type: [String],
    required: true,
  },
});

// Creating a model from the schema
const UserCalorie = mongoose.model("UserCalorie", userCalorieSchema);

export default UserCalorie;
