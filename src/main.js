import Vue from 'vue'
import App from './App.vue'
import router from './router';

Vue.config.productionTip = false

Vue.directive('focus', {
    inserted: function (el) {
        el.focus()
    }
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
