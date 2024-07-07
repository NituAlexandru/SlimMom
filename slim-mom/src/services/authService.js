import api from "./api";

// Function for login
export const login = async (email, password) => {
  // Making a POST request to the login endpoint with email and password
  const response = await api.post("/auth/login", { email, password });
  // Returning the response data which typically contains the user information and token
  return response.data;
};

// Function for registration
export const register = async (name, email, password) => {
  // Making a POST request to the register endpoint with name, email, and password
  const response = await api.post("/auth/register", { name, email, password });
  // Returning the response data which typically contains the user information and token
  return response.data;
};

// Function for logout
export const logout = async () => {
  // Making a POST request to the logout endpoint
  await api.post("/auth/logout");
  // Removing the token from localStorage to log out the user
  localStorage.removeItem("token");
};

export const updateUserProfile = async (profileData) => {
  try {
    // Sending a POST request to the API to update the user profile
    const response = await api.post("/auth/updateUserProfile", profileData);
    return response.data; // Returning the data from the response
  } catch (error) {
    console.error("Error updating user profile:", error); // Logging any errors that occur
    throw error; // Throwing the error to be handled by the caller
  }
};
