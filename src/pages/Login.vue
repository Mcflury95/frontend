<template>
  <div class="bg-gray-50 min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <div class="text-center mb-8">
        <div class="flex justify-center mb-4">
          <img src="https://cdn-icons-png.flaticon.com/512/2920/2920244.png" alt="Logo Imigrasi" class="w-16 h-16" />
        </div>
        <h1 class="text-2xl font-bold text-gray-800">Login Petugas Imigrasi</h1>
        <p class="text-gray-500 mt-2">Masuk ke dashboard internal untuk verifikasi data kedatangan</p>
      </div>

      <Form @submit="handleLogin" :validation-schema="schema" class="space-y-6">
        <div>
          <label class="block text-gray-700 font-medium mb-2">Email</label>
          <Field name="email" type="email" class="w-full border rounded-lg p-3" placeholder="Masukkan email" />
          <ErrorMessage name="email" class="text-red-500 text-sm" />
        </div>

        <div>
          <label class="block text-gray-700 font-medium mb-2">Password</label>
          <Field name="password" type="password" class="w-full border rounded-lg p-3" placeholder="Masukkan password" />
          <ErrorMessage name="password" class="text-red-500 text-sm" />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? "Memproses..." : "Masuk" }}
        </button>
      </Form>

      <div v-if="error" class="mt-4 text-red-500 text-sm">
        <pre>{{ error }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import { loginUser } from "@/services/api";
import { useAuthStore } from "@/stores/auth";

export default {
  name: "Login",
  components: { Form, Field, ErrorMessage },
  data() {
    return {
      error: null,
      loading: false,
      schema: Yup.object({
        email: Yup.string().email("Format email tidak valid").required("Email wajib diisi"),
        password: Yup.string().min(6, "Password minimal 6 karakter").required("Password wajib diisi"),
      }),
    };
  },
  mounted() {
    const authStore = useAuthStore();
    if (authStore.accessToken) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    async handleLogin(values) {
      this.error = null;
      this.loading = true;

      try {
        const response = await loginUser(values);

        // Ambil token dari response.data.access_token
        const token = response?.data?.access_token;

        if (!token) throw new Error("Token tidak ditemukan di response API");

        // Simpan token di Pinia
        const authStore = useAuthStore();
        authStore.setAuth(token);

        // Redirect ke dashboard
        await this.$router.push("/dashboard");
      } catch (err) {
        console.error("Login Error:", err);
        this.error = err?.message || "Login gagal. Periksa kredensial Anda.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
