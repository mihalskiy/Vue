<!--components/User.vue-->
<template lang="html">
  <div>
    <input type="text" v-model="search" placeholder="search products">
              <button v-on:click="sortPrice()" class="btn btn-danger">Resort Me!</button>
    <div v-for="product in filterProducts">
        <h1>{{product.name | to-uppercase}}</h1>
        <img :src="product.image" width="200px" height="400px">
        <p>{{product.description | snippet}}</p>
        <p><small>{{product.price | orderBy 'price'}}</small></p>

    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {

      products: [],
      search: ''
    }
  },
  methods: {
sortedArray: function() {
    function sortPrice(product) {
      console.log('this work');
      if (product.price < product.price)
        return -1;
      if (product.price > product.price)
        return 1;
      return 0;
    }

    return this.product.price.sort(compare);
  }
    
  },
  created() {
    this.$http.get('/src/schema/product_list.json').then((item) => {
        console.log(item);
        this.products = item.data;
    })
  },
   computed: {
    filterProducts: function () {
      return this.products.filter((product) =>{
        return product.name.match(this.search);
      })
    }
  },
}
</script>

<style lang="css">
</style>
