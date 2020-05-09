import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Session from '../views/session.vue';
import Timer from '../views/timer.vue';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/session',
    name: 'session',
    component: Session
  },
  {
    path: '/timer',
    name: 'timer',
    component: Timer
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
