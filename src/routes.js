import Home from './components/Home.vue';
import SingleProduct from './components/SingleProduct.vue';

export default [
    { path: '/', component: Home },
    { path: '/product/:id', component: SingleProduct },
    { path: '*', redirect: '/' },
];
