import { createRouter, createWebHistory } from "vue-router";
import { checkVersion, updateVersion } from "@/utils/update";

const Home = () => import("@/views/HomePage.vue");
const Content = () => import("@/views/contents.vue");
const BoringThings = () => import("@/views/boringThings/index.vue");
const Reflections = () => import("@/views/reflections/index.vue");
const Technics = () => import("@/views/technics/index.vue");
const Economic = () => import("@/views/economic/index.vue");
const Mirror  = () => import("@/views/mirror/index.vue")

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/content',
      component: Content,
      redirect: 'technics',
      children: [
        {
          path: 'technics',
          component: Technics
        },
        {
          path: 'reflections',
          component: Reflections
        },
        {
          path: 'boring-things',
          component: BoringThings
        },
        {
          path: 'economic',
          component: Economic
        },
        {
          path: 'mirror',
          component: Mirror
        },
        {
          path: 'h5',
          component: () => import("@/views/h5/index.vue")
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  checkVersion()
  next()
})

export default router;
