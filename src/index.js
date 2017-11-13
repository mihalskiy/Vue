import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import routes from './routes';
import App from './components/App.vue';
import VuePaginate from 'vue-paginate';

import Search from './components/search.vue';
import BootstrapVue from 'bootstrap-vue';


Vue.use(BootstrapVue);

// filter
Vue.filter('to-uppercase', (value) => {
  return value.toUpperCase();
});

Vue.filter('snippet', (value) => {
  return `${value.slice(0, 100)}...`;
});

Vue.use(VueResource);
Vue.use(VuePaginate);
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history',
  saveScrollPosition: true,
});

new Vue({
  el: '#app',
  render: h => h(App),
  router,
});
