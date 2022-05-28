import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/words",
    name: "Words",
    component: () => import("../views/Words.vue"),
  },
  {
    path: "/import",
    name: "Import",
    component: () => import("../views/Import.vue"),
  },
  {
    path: "/recite",
    name: "Recite",
    component: () => import("../views/Recite.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../views/User.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
