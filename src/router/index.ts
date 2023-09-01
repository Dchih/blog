import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('@/views/homepage.vue')
const Content = () => import('@/views/contents.vue')
const BoringThings = () => import('@/components/boringThings/index.vue')
const Reflections = () => import('@/components/reflections/index.vue')
const Technics = () => import('@/components/technics/index.vue')
const Economic = () => import('@/components/economic/index.vue')

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
        }
      ]
    }
  ]
})

export default router
