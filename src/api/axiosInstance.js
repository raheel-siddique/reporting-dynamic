// src/utils/axiosInstance.js

import axios from "axios";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8086/api/v1", // Adjust if needed
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor — adds Bearer token if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor — handles errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error("401 Unauthorized! Redirecting to login...");
        // Optional: Clear token and redirect
        // localStorage.removeItem("authToken");
        // window.location.href = "/#/auth/login";
      } else if (error.response.status === 403) {
        console.error("403 Forbidden - You don't have access.");
      } else if (error.response.status === 500) {
        console.error("500 Internal Server Error");
      }
    } else if (error.request) {
      console.error("No response received from server.");
    } else {
      console.error("Request setup error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
