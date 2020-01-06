import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import GuessThatModule from '@/components/GuessThatModule';
import NameThatVocaloid from '@/components/NameThatVocaloid';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      component: Home
    },
    {
      path: '/name-that-module',
      component: GuessThatModule
    },
    {
      path: '/name-that-vocaloid',
      component: NameThatVocaloid
    }
  ]
})
