import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CheatSheetView from '../views/CheatSheetView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/id/:id',
    name: 'CheatSheet',
    component: CheatSheetView
  },
  // {
  //   path: '/cs/:class/:spec/:by',
  //   name: 'CheatSheet',
  //   component: CheatSheetView
  // },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
