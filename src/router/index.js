import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    meta: { layout: "main" },
    component: Home,
  },
  {
    path: "/category",
    name: "Category",
    meta: { layout: "main" },
    component: () => import("../views/Category.vue"),
  },
  {
    path: "/category/:id",
    name: "CategoryName",
    meta: { layout: "main" },
    component: () => import("../views/ChoosenCategory.vue"),
  },
  // {
  //   Не получилось
  //   path: "/category/:id/:title",
  //   name: "TestPage",
  //   meta: { layout: "main" },
  //   component: () => import("../views/TestPage.vue")
  // },
  {
    path: "/test/:title",
    name: "TestPage",
    meta: { layout: "main" },
    component: () => import("../views/TestPage.vue"),
  },
  {
    path: "/resent",
    name: "Resent",
    meta: { layout: "main" },
    component: () => import("../views/Resent.vue"),
  },
  {
    path: "/create-lesson",
    name: "Create lesson",
    meta: { layout: "main" },
    component: () => import("../views/CreateLesson.vue"),
  },
  {
    path: "/lesson-book",
    name: "LessonBook",
    meta: { layout: "main" },
    component: () => import("../views/LessonBook.vue"),
  },
  {
    path: "/chedule",
    name: "Chedule",
    meta: { layout: "main" },
    component: () => import("../views/Chedule.vue"),
  },
  {
    path: "/languages",
    name: "Languages",
    meta: { layout: "main" },
    component: () => import("../views/Languages.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
