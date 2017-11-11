<!--components/User.vue-->
<template lang="html">
  <div>
    <input type="text" v-model="search" placeholder="search products">
    <div v-for="product in filterProducts">
        <h1>{{product.name | to-uppercase}}</h1>
        <img :src="product.image" width="200px" height="400px">
        <p>{{product.description | snippet}}</p>
        <p><small>{{product.price}}</small></p>

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
