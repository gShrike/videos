import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import Links from '@/components/Links';
import Token from '@/components/Token';
import New from '@/components/New';
import Edit from '@/components/Edit';

Vue.use(Router);

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
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
      path: '/links',
      name: 'Links',
      component: Links,
    },
    {
      path: '/token',
      name: 'Token',
      component: Token,
    },
    {
      path: '/new',
      name: 'New',
      component: New,
    },
    {
      path: '/edit/:id',
      name: 'Edit',
      component: Edit,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
