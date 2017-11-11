<template lang="html">
  <div class="col-sm-6 col-sm-offset-3">
      <h1>Get a Free Chuck Norris Users!</h1>
      <button class="btn btn-primary" v-on:click="getUsers()">Get a Users</button>
      <div class="quote-area" v-if="quote">
        <h2><blockquote>{{ quote }}</blockquote></h2>
      </div>
    </div>
</template>

<script>


export default {
  data() {
    return {
      quote: '',
    };
  },
  methods: {
    getUsers() {
//      axios.get('http://localhost:3001/api/random-quote')
//      axios.get('http://localhost:1337')
//        .then((response) => {
//          this.quote = response.data;
//        })
//        .catch((err) => console.error(err));
    }
  }
}
</script>

<style lang="css">
</style>
