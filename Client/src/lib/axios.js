import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true, // enables cookies
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(`API Error: ${error.response?.status} - ${error.response?.data?.message}`);
    return Promise.reject(error);
  }
);
