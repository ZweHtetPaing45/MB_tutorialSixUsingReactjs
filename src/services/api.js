import axios from "axios";

const API_BASE = "https://microfinance-business-bankend-using.onrender.com/api"; // change here if your backend URL differs

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json"
  }
});

// Attach token automatically if exist
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default api;
