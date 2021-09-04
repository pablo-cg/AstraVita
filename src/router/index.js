import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import VistaInicioSesion from '@/views/VistaInicioSesion.vue'
import VistaRegistro from '@/views/VistaRegistro.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'InicioSesion',
    component: VistaInicioSesion
  },
  {
    path: '/registro',
    name: 'Registro',
    component: VistaRegistro
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
