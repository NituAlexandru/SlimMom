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
});

// Creating a model from the schema
const User = mongoose.model("User", userSchema);

export default User;
