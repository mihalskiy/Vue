import _ from 'lodash';
import Vue from 'vue';
import axios from 'axios';
import VueRouter from 'vue-router';

import {
  App,
  Home
} from './components';
// if you want to use the standard this.$http as you used to do with VueResource
// I don't like this approach so code uses axion directly though
// Uncomment below and then replace in code "axios" with this.$http
// axios.defaults.transformRequest = [function (data) {
//   // Do whatever you want to transform the data
//   return data;
// }]
// _.merge({},{})
// debugger;
axios.defaults.transformResponse = [function (data) {
  // Do whatever you want to transform the data
  return JSON.parse(data).data || JSON.parse(data);
}];
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:1337';
// axios.defaults = {
//   transformRequest: [function (data) {
//     // Do whatever you want to transform the data
//
//     return data;
//   }],
//
//   // `transformResponse` allows changes to the response data to be made before
//   // it is passed to then/catch
//   transformResponse: [function (data) {
//     // Do whatever you want to transform the data
//     return JSON.parse(data).data;
//   }],
// };
Vue.prototype.$http = axios;

// Check the users auth status when the app starts
//auth.checkAuth();

Vue.use(VueRouter);

Vue.filter('to-uppercase',(value) => {
  return  value.toUpperCase()
})



const routes = [
  { path: '/home', component: Home },
  // { path: '/users', component: User },
  // { path: '/signup', component: Signup },
  // { path: '/login', component: Login },
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
