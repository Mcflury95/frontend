// src/services/auth.js
import { useAuthStore } from "@/stores/auth";

export function saveToken(token) {
  const authStore = useAuthStore();
  authStore.setAuth(token);
}

export function getToken() {
  const authStore = useAuthStore();
  return authStore.accessToken;
}

export function logout() {
  const authStore = useAuthStore();
  authStore.clearAuth();
}

export function isAuthenticated() {
  const authStore = useAuthStore();
  return !!authStore.accessToken;
}
