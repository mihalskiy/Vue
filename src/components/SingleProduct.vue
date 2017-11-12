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
      console.log('=++++++++++++++++++++++ single-product')
      this.$http.get('/src/schema/product_list.json').then((item)=> {
          console.log(item)
          console.log(item.data)
          console.log('-----------------------')
          console.log(item.data[this.id])
          this.product = item.data[this.id]
      })
  }
}
</script>

