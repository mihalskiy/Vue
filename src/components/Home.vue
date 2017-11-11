<!--components/User.vue-->
<template lang="html">
  <div >
    <div v-for="product in products">
        <p>{{product.title}}</p>
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
    this.$http.get('/src/schema/product_letter.json').then((item) => {
        console.log(item);
        this.products = item.data;
    })
  }
}
</script>

<style lang="css">
</style>
