<template>
  <div>
      <search></search>
      <product></product>
  </div>
</template>

<script>
import Product from './product.vue';
import SingleProduct from './SingleProduct.vue';
import Search from './search.vue';



export default {
    components: {
      'product': Product,
      'search': Search
    },
    data(){
      return {

      }
    }
}
</script>
