import Home from './components/Home.vue';
import singleProduct from './components/singleProduct.vue';

export default [
    {path: '/', component: Home},
    {path: '/singleProduct/:id', component: singleProduct}
]