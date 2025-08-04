import { createRouter, createWebHistory } from "vue-router";
import Login from "./pages/Login.vue";
import ArrivalForm from "./pages/ArrivalForm.vue";
import Dashboard from "./pages/Dashboard.vue";
import ArrivalDetail from "./pages/ArrivalDetail.vue";
import { isAuthenticated } from "./services/auth";

const routes = [
  { path: "/", component: ArrivalForm },
  { path: "/login", component: Login },
  { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/arrivals/:id", component: ArrivalDetail, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = isAuthenticated();
  // console.log("Guard - LoggedIn:", loggedIn, "Target:", to.path);

  if (to.meta.requiresAuth && !loggedIn) {
    return next("/login");
  }
  if (to.path === "/login" && loggedIn) {
    return next("/dashboard");
  }
  next();
});

export default router;
