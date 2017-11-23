import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import Teams from '@/components/Teams';
import Links from '@/components/Links';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
    {
      path: '/teams',
      name: 'Teams',
      component: Teams,
    },
    {
      path: '/links',
      name: 'Links',
      component: Links,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
