import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index"
  },
  {
    path: "/index",
    component: () => import('@/pages/index/Index.vue'),
  },
  {
    path: "/videoList",
    component: () => import('@/pages/index/VideoList.vue'),
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
