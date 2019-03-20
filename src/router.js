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
      component: () => import(/* webpackChunkName: "jobs_corp_status" */ './views/corp/_status/register.vue'),
    },
    {
      path: '/corp/info',
      component: () => import(/* webpackChunkName: "jobs_corp_info" */ './views/corp/info.vue'),
    },
    {
      path: '/campus/:status',
      component: () => import(/* webpackChunkName: "jobs_campus_status" */ './views/campus/_status.vue'),
    },
    {
      path: '/jobinfo/:status',
      component: () => import(/* webpackChunkName: "jobs_jobinfo_status" */ './views/jobinfo/_status.vue'),
    },
    {
      path: '/jobfair/:status',
      component: () => import(/* webpackChunkName: "jobs_jobfair_status" */ './views/jobfair/_status.vue'),
    },
    {
      name: 'jobfair_corp',
      path: '/jobfair/:fair_id/corp',
      component: () => import(/* webpackChunkName: "jobs_jobfair_corp" */ './views/jobfair/corp.vue'),
    },
    {
      name: 'jobfair_ticket',
      path: '/jobfair/:fair_id/ticket',
      component: () => import(/* webpackChunkName: "jobs_jobfair_ticket" */ './views/jobfair/ticket.vue'),
    },
  ],
});

export default router;
