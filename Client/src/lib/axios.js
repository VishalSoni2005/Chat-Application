import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true, // enables cookies
  headers: {
    "Content-Type": "application/json"
  }
});

// Optional: Interceptors to log errors globally or add tokens if needed
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(`API Error: ${error.response?.status} - ${error.response?.data?.message}`);
    return Promise.reject(error);
  }
);
