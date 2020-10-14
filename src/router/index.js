import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginView.vue")
  },
  {
    path: "/home",
    name: "Home",
    meta: {
      requireLogin: true
    },
    component: () => import("../views/HomeView.vue"),
    children: [
      {
        path: "managerorder",
        name: "ManagerOrder",
        meta: {
          requireLogin: true
        },
        component: () => import("../views/HomeViews/ManagerOrder.vue")
      },
      {
        path: "managergoods",
        name: "ManagerGoods",
        meta: {
          requireLogin: true
        },
        component: () => import("../views/HomeViews/ManagerGoods.vue")
      },
      {
        path: "managercomments",
        name: "ManagerComments",
        meta: {
          requireLogin: true
        },
        component: () => import("../views/HomeViews/ManagerComments.vue")
      },
      {
        path: "managernotice",
        name: "ManagerNotice",
        meta: {
          requireLogin: true
        },
        component: () => import("../views/HomeViews/ManagerNotice.vue")
      },
      {
        path: "managerbattle",
        name: "ManagerBattle",
        meta: {
          requireLogin: true
        },
        component: () => import("../views/HomeViews/ManagerBattle.vue")
      }
    ]
  },
  {
    path: "*",
    redirect: "/login"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

//全局路由守卫
router.beforeEach((to, from, next) => {
  //如果该路由需要导航
  if (to.meta.requireLogin) {
    //如果已经登录则跳转
    if (localStorage.getItem("loginStatus") == "true") {
      next();
      //如果没登录则跳转到登录页面
    } else {
      next({
        path: "/login"
      });
    }
    //该路由不需要导航则直接跳转
  } else {
    next();
  }
});

export default router;
