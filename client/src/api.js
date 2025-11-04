import axios from "axios";

// Define the base URL for the backend API server
const API_BASE_URL = "http://localhost:5000/api";

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to include the JWT token in the Authorization header to verify user's identity
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
