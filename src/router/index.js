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
    path: "/registration",
    name: "Registration",
    meta: { layout: "login" },
    component: () => import("../views/Registration.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: { layout: "login" },
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/category",
    name: "Category",
    meta: { layout: "main" },
    component: () => import("../views/Category.vue"),
  },
  {
    path: "/category/:category",
    name: "CategoryName",
    meta: { layout: "main" },
    component: () => import("../views/CategoryChoosen.vue"),
  },
  {
    path: "/test/:id",
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
    path: "/lesson-book/:id",
    name: "Learning",
    meta: { layout: "main" },
    component: () => import("../views/LearningTest.vue"),
  },
  {
    path: "/chedule",
    name: "Chedule",
    meta: { layout: "main" },
    component: () => import("../views/Chedule.vue"),
  },
  {
    path: "/own-tests",
    name: "OwnTests",
    meta: { layout: "main" },
    component: () => import("../views/OwnTests.vue"),
  },
  {
    path: "/languages",
    name: "Languages",
    meta: { layout: "main" },
    component: () => import("../views/Languages.vue"),
  },
  {
    path: "/courses",
    name: "Courses",
    meta: { layout: "main" },
    component: () => import("../views/Courses.vue"),
  },
  {
    path: "/create-course",
    name: "CourseCreate",
    meta: { layout: "main" },
    component: () => import("../views/CourseCreate.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
