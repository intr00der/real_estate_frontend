import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import EstateDetails from "../views/EstateDetails";
import EstatePurchase from "../views/EstatePurchase";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true,
  },
  {
    path: '/:estateId/details/',
    name: 'estate-details',
    component: EstateDetails,
    props: true,
  },
  {
    path: '/:estateId/purchase/',
    name: 'estate-purchase',
    component: EstatePurchase,
    props: true,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
