import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/home.vue';

Vue.use(Router);

const router = new Router({
  mode: process.env.VUE_APP_ROUTER_MODE || 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/corp/:status/register',
      component: () => import(/* webpackChunkName: "corp_status" */ './views/corp/_status/register.vue'),
    },
    {
      path: '/campus/:status',
      component: () => import(/* webpackChunkName: "campus_status" */ './views/campus/_status.vue'),
    },
    {
      path: '/jobfair/:status',
      component: () => import(/* webpackChunkName: "jobfair_status" */ './views/jobfair/_status.vue'),
    },
    {
      path: '/jobinfo/:status',
      component: () => import(/* webpackChunkName: "jobinfo_status" */ './views/jobinfo/_status.vue'),
    },
  ],
});

export default router;
