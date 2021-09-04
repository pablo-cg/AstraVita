import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import InicioSesion from '@/views/InicioSesion.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'InicioSesion',
    component: InicioSesion
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
