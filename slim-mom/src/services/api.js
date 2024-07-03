import axios from "axios";

// Creating an Axios instance with a base URL
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Base URL for all API requests
});

// Adding a request interceptor to the Axios instance
api.interceptors.request.use(
  (config) => {
    // Retrieving the token from localStorage
    const token = localStorage.getItem("token");

    // If a token exists, add it to the Authorization header
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // Returning the config object to proceed with the request
    return config;
  },
  (error) => {
    // Handling any request errors
    return Promise.reject(error);
  }
);

export default api;
