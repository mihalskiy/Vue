import _ from 'lodash';
import Vue from 'vue';
import axios from 'axios';
import VueRouter from 'vue-router';

import {
  App,
  Home
} from './components';


axios.defaults.transformResponse = [function (data) {
  // Do whatever you want to transform the data
  return JSON.parse(data).data || JSON.parse(data);
}];

Vue.prototype.$http = axios;


Vue.use(VueRouter);

//filter
Vue.filter('to-uppercase',(value) => {
  return  value.toUpperCase()
});

Vue.filter('snippet', (value) => {
  return value.slice(0, 100) + '...';
})



const routes = [
  { path: '/home', component: Home },
  { path: '*', redirect: '/home' },
];

export const router = new VueRouter({
  routes,
});

const app = new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
