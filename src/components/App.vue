<template>
  <div>
      <search></search>
      <product></product>
  </div>
</template>

<script>
import Product from './Product.vue';
import Search from './Search.vue';



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
