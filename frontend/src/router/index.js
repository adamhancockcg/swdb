import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import ResourceView from "../views/ResourceView.vue";
import SubResourceView from "../views/SubResourceView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/:resource",
      name: "resource",
      component: ResourceView,
    },
    {
      path: "/:resource/:subresource",
      name: "subresource",
      component: SubResourceView,
    },
  ],
});

export default router;
