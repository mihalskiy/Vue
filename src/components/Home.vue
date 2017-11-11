<!--components/User.vue-->
<template lang="html">
  <div >
    <div v-for="product in products">
        <h1>{{product.name | to-uppercase}}</h1>
        <img :src="product.image" width="200px" height="400px">
        <p>{{product.title }}</p>
        <p><small>{{product.price}}</small></p>

    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      products: []
    }
  },
  methods: {
   
  },
  created() {
    this.$http.get('/src/schema/product_list.json').then((item) => {
        console.log(item);
        this.products = item.data;
    })
  }
}
</script>

<style lang="css">
</style>
