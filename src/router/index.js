import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home/index.vue"),
  },
  {
    path: "/products",
    name: "Products",
    component: () => import("../views/Products/index.vue"),
  },
  {
    path: "/productDetail/:id?",
    name: "ProductDetail",
    component: () => import("../views/ProductDetail/index.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart/index.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/member",
    name: "Member",
    component: () => import("../views/Member/index.vue"),
  },
  {
    path: "/member/edit",
    name: "MemberEdit",
    component: () => import("../views/Member/edit.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem("userInfo");
  if (to.path === "/member" && user) {
    next();
  } else if (to.path !== "/member") {
    next();
  } else {
    next("/login");
  }
  window.scroll(0, 0);
});

export default router;
