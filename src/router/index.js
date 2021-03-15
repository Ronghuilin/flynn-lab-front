import Vue from 'vue'
import VueRouter from 'vue-router'
import HeaderNavigation from "@/components/HeaderNavigation";
import Statistics from '@/views/Statistics.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Statistics',
    component: Statistics
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/About")
  },
  {
    path: '/archive',
    name: 'Archive',
    component: () => import("@/views/Archive")
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import( "@/views/Blog")
  },
  {
    path: '/lab',
    name: 'Lab',
    component: () => import("@/views/Lab")
  },
  {
    path: '/header-navigation',
    name: "HeaderNavigation",
    component: HeaderNavigation
  },
  {
    path: '/hello-word',
    name: "HelloWorld",
    component: () => import("@/components/HelloWorld")
  }
]

const router = new VueRouter({
  routes
})

export default router
