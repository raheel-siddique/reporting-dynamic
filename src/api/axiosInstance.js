import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8086",
});

axiosInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("authToken");
    // if (token) {
      // config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Unauthorized! Redirecting to login now...");

        // Show confirmation before logging out
        localStorage.removeItem("authToken");
        window.location.href = "/#/auth/login";
      } else if (error.response.status === 500) {
        console.error("Server error! Try again later.");
      }
    } else if (error.request) {
      console.error("Network error! Please check your connection.");
    } else {
      console.error("Error setting up request:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
