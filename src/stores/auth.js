// src/stores/auth.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: localStorage.getItem("accessToken") || null,
  }),
  actions: {
    setAuth(token) {
      this.accessToken = token;
      // localStorage.setItem("accessToken", token);
    },
    clearAuth() {
      this.accessToken = null;
      // localStorage.removeItem("accessToken");
    },
  },
});
