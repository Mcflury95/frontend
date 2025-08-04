// src/services/api.js
import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const api = axios.create({
  baseURL: "/api", // gunakan proxy agar CORS tidak error saat dev
  withCredentials: true, // penting untuk kirim cookie HttpOnly
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor ambil token dari Pinia
api.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  if (authStore.accessToken) {
    config.headers.Authorization = `Bearer ${authStore.accessToken}`;
  }
  return config;
});

export async function loginUser(credentials) {
  try {
    const response = await api.post("/cookie/login", credentials);
    return response.data;
  } catch (error) {
    // throw error.response ? error.response.data : error;
  }
}

export default api;
