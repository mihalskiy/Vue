<template>
    <div id="single-product">
        <h1>{{product.name}}</h1>
        <article></article>
    </div>
</template>

<script>
export default {
  data() {
      return {
          id: this.$route.params.id,
          product: {}
      }
  },
  created() {
      this.$http.get('/src/schema/product_list.json' + this.id).then((item)=> {
          console.log(item)
          this.product = item.data
      })
  }
}
</script>

