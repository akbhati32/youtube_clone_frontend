import axios from "axios";

// Create a reusable Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Interceptor to attach JWT token to every request (if available)
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    // If token exists, add Authorization header
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;  // Continue with request
});

export default axiosInstance;
