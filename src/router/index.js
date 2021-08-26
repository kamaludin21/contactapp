import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/beranda",
  },
  {
    path: "/auth",
    redirect: "/auth/login",
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import("../layouts/Auth.vue"),
    children: [
      {
        path: "login",
        name: "Login",
        component: () => import("./../views/Login.vue"),
      },
      {
        path: "register",
        name: "Register",
        component: () => import("./../views/Register.vue"),
      },
    ],
  },
  {
    path: "/",
    name: "Dashboard",
    component: () => import("../layouts/Dashboard.vue"),
    children: [
      {
        path: "beranda",
        name: "Beranda",
        component: () => import("./../views/Beranda.vue"),
      },
      {
        path: "/kontakbaru",
        name: "KontakBaru",
        component: () => import("./../views/KontakBaru.vue"),
      },
      {
        path: "/kontak/:id",
        name: "Edit",
        component: () => import("./../views/KontakBaru.vue"),
      },
      {
        path: "profil",
        name: "Profile",
        component: () => import("./../views/Profile.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: "active",
  routes,
});

export default router;
