<!--components/Home.vue-->
<template lang="html">
  <div>

    <!--<h3>Search by product name</h3>-->
    <!--<input type="text" v-model="search" placeholder="search products">-->


    <!--<div v-for="product in filterProducts">-->

        <!--<h1>{{product.name | to-uppercase}}</h1>-->

        <!--<a :href="'/product/' + product.id">-->
          <!--<img :src="product.image" width="20px" height="40px">-->
          <!--<p>{{product.description | snippet}}</p>-->
          <!--<p><small>{{product.price}}</small></p>-->
        <!--</a>-->

    <!--</div>-->


    <hr>

    <div>
        <h3>Sorting by price (ASC, DESC)</h3> :

         <select v-model="selected" @change="sortProducts($event)">
            <option selected value="asc">Sort 1...100 price by ascending</option>
            <option value="desc">Sort 100...1 price by descending</option>
        </select>
    </div>
    <hr>

    <paginate
      name="filterProducts"
      :list="products"
      :per="2"
    >
      <li v-for="product in paginated('filterProducts')">
        <h1>{{product.name | to-uppercase}}</h1>

        <a :href="'/product/' + product.id">
          <img :src="product.image" width="20px" height="40px">
          <p>{{product.description | snippet}}</p>
          <p><small>{{product.price}}</small></p>
        </a>
      </li>
    </paginate>


    <hr>

    <h3>Pagination</h3>

    <!--THIS IS 'ul > li'-->
    <paginate-links
      for="filterProducts"

      :show-step-links="true"

      :step-links="{
        next: 'Next',
        prev: 'Prev'
      }"
    ></paginate-links>


  </div>
</template>

<script>
import _ from 'lodash';

export default {
  data() {
    return {
      products: [],
      search: '',
      selected: '',
      paginate: ['filterProducts']
    }
  },
  methods: {
    sortProducts: function(event)  {
      this.products = _.orderBy(this.products, ['price'], [event.currentTarget.value]);
    },
  },

  created() {
    this.$http.get('/src/schema/product_list.json').then((item) => {
        console.log(item);
        this.products = item.data;
    })
  },

   computed: {
    filterProducts: function () {
      debugger;
      console.log('++#@##@@#@#')
      this.products = this.products.filter((product) =>{
        return product.name.toLowerCase().match(this.search.toLowerCase());
      })
    },
  },
}
</script>

<style lang="css">
</style>
