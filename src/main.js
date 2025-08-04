import { createApp } from 'vue';
import { createPinia } from 'pinia'; // ✅ Tambahkan import Pinia
import App from './App.vue';
import router from './router';

import './style.css';

const app = createApp(App);

// ✅ Registrasi Pinia agar bisa digunakan di seluruh aplikasi
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.mount('#app');
