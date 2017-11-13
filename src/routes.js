import Product from './components/product.vue';
import SingleProduct from './components/SingleProduct.vue';


export default [
   // { path: '/', component: Home },
    { path: '/product/:id', component: SingleProduct },
    { path: '*', redirect: '/' },
];
