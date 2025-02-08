import axios from "axios";

console.log(`API URL: ${import.meta.env.VITE_API_URL}`);

// Use the VITE_API_URL from the environment variables
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Automatically reads the environment variable
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
