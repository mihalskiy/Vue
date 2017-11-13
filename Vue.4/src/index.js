import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './components/app/app.vue';
import VuePaginate from 'vue-paginate';
import store from './store';

// filter
Vue.filter('to-uppercase', (value) => {
  return value.toUpperCase();
});

Vue.filter('snippet', (value) => {
  return `${value.slice(0, 100)}...`;
});

Vue.use(VueResource);
Vue.use(VuePaginate);

new Vue({
  el: '#app',
  render: h => h(App),
  store,
});
