<!--components/User.vue-->
<template lang="html">
  <div class="title"></div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
   
  },
  created() {
    this.$http.get('/src/schema/product_letter.json').then(function(data) {
        console.log(data);
    })
  }
}
</script>

<style lang="css">
</style>
