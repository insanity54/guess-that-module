import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import NameThatX from '@/components/NameThatX';
import vocaloids from '@/assets/vocaloids.json';
import modules from '@/assets/modules.json';

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      component: Home
    },
    {
      path: '/name-that-module',
      component: NameThatX,
      props: {
        x: modules,
        title: 'Name That Module!',
        unit: 'modules'
      }
    },
    {
      path: '/name-that-vocaloid',
      component: NameThatX,
      props: {
        x: vocaloids,
        title: 'Name That VOCALOID!',
        unit: 'VOCALOIDS'
      }
    }
  ]
})
