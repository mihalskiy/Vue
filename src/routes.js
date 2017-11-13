import Product from './components/Product.vue';

export default [
   // { path: '/', component: Home },
    { path: '/product/:id', component: SingleProduct },
    { path: '*', redirect: '/' },
];
