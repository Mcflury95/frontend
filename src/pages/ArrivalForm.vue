<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Hero Section -->
    <div class="hero-gradient text-white py-16">
      <div class="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between max-w-6xl">
        <div class="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
          <h1 class="text-4xl font-bold mb-4">Pendaftaran Kedatangan Wisatawan Mancanegara</h1>
          <p class="text-lg opacity-90">Isi data sebelum tiba untuk mempercepat proses di bandara</p>
        </div>
        <div class="lg:w-1/2 flex justify-center">
          <img src="https://cdn-icons-png.flaticon.com/512/201/201623.png" alt="Turis" class="w-64 h-auto"/>
        </div>
      </div>
    </div>

    <!-- Form Section -->
    <div class="container mx-auto px-4 py-12 max-w-4xl">
      <div class="bg-white rounded-2xl form-shadow p-8">
        <Form @submit="submitForm" :validation-schema="schema" class="space-y-10">

          
          <!-- Informasi Pribadi -->
          <div>
            <h2 class="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <span class="material-icons text-blue-600 mr-2">person</span>Informasi Pribadi
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Field name="full_name" v-model="form.full_name" class="border p-3 rounded-lg w-full" placeholder="Nama Lengkap"/>
                <ErrorMessage name="full_name" class="text-red-500 text-sm"/>
              </div>
              <div>
                <Field name="passport_no" v-model="form.passport_no" class="border p-3 rounded-lg w-full" placeholder="Nomor Paspor"/>
                <ErrorMessage name="passport_no" class="text-red-500 text-sm"/>
              </div>
              <div>
                <Field name="nationality" v-model="form.nationality" class="border p-3 rounded-lg w-full" placeholder="Kebangsaan"/>
                <ErrorMessage name="nationality" class="text-red-500 text-sm"/>
              </div>
              <div>
                <Field as="select" name="gender" v-model="form.gender" class="border p-3 rounded-lg w-full">
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </Field>
                <ErrorMessage name="gender" class="text-red-500 text-sm"/>
              </div>
              <div>
                <Field type="date" name="birth_date" v-model="form.birth_date" class="border p-3 rounded-lg w-full"/>
                <ErrorMessage name="birth_date" class="text-red-500 text-sm"/>
              </div>
              <div>
                <Field name="phone_number" v-model="form.phone_number" class="border p-3 rounded-lg w-full" placeholder="Nomor Telepon"/>
                <ErrorMessage name="phone_number" class="text-red-500 text-sm"/>
              </div>
              <div>
                <Field type="email" name="email" v-model="form.email" class="border p-3 rounded-lg w-full" placeholder="Email"/>
                <ErrorMessage name="email" class="text-red-500 text-sm"/>
              </div>
              <div class="md:col-span-2">
                <Field as="textarea" name="address_in_indonesia" v-model="form.address_in_indonesia" class="border p-3 rounded-lg w-full" rows="3" placeholder="Alamat tinggal di Indonesia"/>
                <ErrorMessage name="address_in_indonesia" class="text-red-500 text-sm"/>
              </div>
            </div>
          </div>

          <!-- Informasi Perjalanan -->
          <div>
            <h2 class="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <span class="material-icons text-blue-600 mr-2">flight_takeoff</span>Informasi Perjalanan
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field name="flight_info" v-model="form.flight_info" class="border p-3 rounded-lg w-full" placeholder="Maskapai & Nomor Penerbangan"/>
              <ErrorMessage name="flight_info" class="text-red-500 text-sm md:col-span-2"/>
              <Field type="datetime-local" name="arrival_datetime" v-model="form.arrival_datetime" class="border p-3 rounded-lg w-full"/>
              <ErrorMessage name="arrival_datetime" class="text-red-500 text-sm"/>
              <Field name="departure_city" v-model="form.departure_city" class="border p-3 rounded-lg w-full" placeholder="Kota Asal Keberangkatan"/>
              <ErrorMessage name="departure_city" class="text-red-500 text-sm"/>
              <Field name="destination_city" v-model="form.destination_city" class="border p-3 rounded-lg w-full" placeholder="Tujuan di Indonesia"/>
              <ErrorMessage name="destination_city" class="text-red-500 text-sm"/>
            </div>
          </div>

          <!-- Kesehatan -->
          <div>
            <h2 class="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <span class="material-icons text-blue-600 mr-2">health_and_safety</span>Kesehatan & Kontak Darurat
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field as="textarea" name="health_info" v-model="form.health_info" class="border p-3 rounded-lg md:col-span-2 w-full" rows="3" placeholder="Riwayat Kesehatan"/>
              <ErrorMessage name="health_info" class="text-red-500 text-sm md:col-span-2"/>
              <Field name="emergency_contact_name" v-model="form.emergency_contact_name" class="border p-3 rounded-lg w-full" placeholder="Nama Kontak Darurat"/>
              <ErrorMessage name="emergency_contact_name" class="text-red-500 text-sm"/>
              <Field name="emergency_contact_phone" v-model="form.emergency_contact_phone" class="border p-3 rounded-lg w-full" placeholder="Nomor Kontak Darurat"/>
              <ErrorMessage name="emergency_contact_phone" class="text-red-500 text-sm"/>
            </div>
          </div>

          <!-- Upload -->
          <div>
            <h2 class="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <span class="material-icons text-blue-600 mr-2">upload_file</span>Upload Dokumen
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="file" @change="handleFileUpload('face_photo_url', $event)" class="border p-3 rounded-lg w-full"/>
              <input type="file" @change="handleFileUpload('vaccine_card_url', $event)" class="border p-3 rounded-lg w-full"/>
            </div>
          </div>

          <!-- Submit -->
          <div>
            <button type="submit" class="sticky-submit w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all">
              Kirim Pendaftaran
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import api from "@/services/api";
import { logout } from "@/services/auth";

export default {
  name: "ArrivalForm",
  components: { Form, Field, ErrorMessage },
  data() {
    return {
      form: {
        full_name: "",
        passport_no: "",
        nationality: "",
        gender: "",
        birth_date: "",
        phone_number: "",
        email: "",
        address_in_indonesia: "",
        flight_info: "",
        arrival_datetime: "",
        departure_city: "",
        destination_city: "",
        health_info: "",
        emergency_contact_name: "",
        emergency_contact_phone: "",
        face_photo_url: "",
        vaccine_card_url: ""
      },
      schema: Yup.object({
        full_name: Yup.string().required("Nama wajib diisi"),
        passport_no: Yup.string().required("Nomor paspor wajib diisi"),
        nationality: Yup.string().required("Kebangsaan wajib diisi"),
        gender: Yup.string().required("Pilih jenis kelamin"),
        birth_date: Yup.date().required("Tanggal lahir wajib diisi"),
        phone_number: Yup.string().min(8, "Nomor telepon minimal 8 digit").required("Nomor telepon wajib diisi"),
        email: Yup.string().email("Format email tidak valid").required("Email wajib diisi"),
        address_in_indonesia: Yup.string().required("Alamat di Indonesia wajib diisi"),
        flight_info: Yup.string().required("Informasi penerbangan wajib diisi"),
        arrival_datetime: Yup.string().required("Tanggal & jam kedatangan wajib diisi"),
        departure_city: Yup.string().required("Kota asal wajib diisi"),
        destination_city: Yup.string().required("Tujuan di Indonesia wajib diisi"),
        health_info: Yup.string().required("Informasi kesehatan wajib diisi"),
        emergency_contact_name: Yup.string().required("Nama kontak darurat wajib diisi"),
        emergency_contact_phone: Yup.string().min(8, "Nomor kontak darurat minimal 8 digit").required("Nomor kontak darurat wajib diisi")
      })
    };
  },
  methods: {
    handleFileUpload(field, event) {
      const file = event.target.files[0];
      if (file) {
        this.form[field] = URL.createObjectURL(file);
      }
    },
    async submitForm() {
      this.loading = true; //  aktifkan loading
      try {
        await api.post("/arrivals", this.form);
        alert(" Pendaftaran berhasil dikirim!");
        this.resetForm();
      } catch (err) {
        if (err.response?.status === 401) {
          logout();
          this.$router.push("/login");
        } else {
          alert("❌ Error: " + (err.response?.data?.message || err.message));
        }
      } finally {
        this.loading = false; //  matikan loading
      }
    },
    resetForm() {
      Object.keys(this.form).forEach(key => (this.form[key] = ""));
    }
  }
};
</script>

<style>
.hero-gradient { background: linear-gradient(135deg, #007bff 0%, #00a6ff 100%); }
.form-shadow { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
.sticky-submit { position: static; }
@media (max-width: 768px) {
  .sticky-submit { position: fixed; bottom: 20px; left: 20px; right: 20px; z-index: 50; }
}
</style>
