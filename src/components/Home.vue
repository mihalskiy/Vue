<!--components/Home.vue-->
<template lang="html">
  <div class="container">
    <h1>Products list page</h1>
    <hr>
    <hr>
	<div class="row">
		<div class="col-md-12">
            <div class="input-group" id="adv-search">
                <input type="text" class="form-control" v-model="searchQuery" @keyup="searchByProductName" placeholder="search products" />
                <div class="input-group-btn">
                    <div class="btn-group" role="group">
                        <div class="dropdown dropdown-lg">
                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span class="caret"></span></button>
                            <div class="dropdown-menu dropdown-menu-right" role="menu">
                                <form class="form-horizontal" role="form">
                                  <div class="form-group">
                                    <label for="filter">Filter by</label>
                                    <select class="form-control" v-model="selectedSorting" @change="sortProductsByPrice">
                                        <!-- <option value="0" disabled selected>All Snippets</option> -->
                                        <option value="asc" selected>Sort 1...100 price by ascending</option>
                                        <option value="desc">Sort 100...1 price by descending</option>
                                    </select>
                                  </div>
                                  <div class="form-group">
                                    <label for="contain">min-price</label>
                                    <span class="input-group-addon">UAH</span>
                                    <input class="form-control" v-model="minPrice" @keyup="filterProductsByPrice" id="minPrice" type="number" min="0"/>
                                  </div>
                                  <div class="form-group">
                                    <label for="contain">max-price</label>
                                    <span class="input-group-addon">UAH</span>
                                    <input class="form-control" v-model="maxPrice" @keyup="filterProductsByPrice" id="maxPrice" type="number" min="0" />
                                    
                                  </div>
                                  <!-- <button v-on:click="resetPriceFilter" >reset filter</button> -->
                                  <button type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
                                </form>
                            </div>
                        </div>
                        <button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
                    </div>
                </div>
            </div>
          </div>
        </div>

    
    <hr>

    <div class="row">
     <h3>Sort by price</h3>
     <div class="input-group">
         <!-- <select v-model="selectedSorting" @change="sortProductsByPrice" class="form-control">
            <option value="" disabled selected>select sort price</option>
            <option value="asc">Sort 1...100 price by ascending</option>
            <option value="desc">Sort 100...1 price by descending</option>
         </select> -->
         <div class="clearfix"></div>
      </div>
    </div>
    <hr>

    <paginate
      name="productsListChanged"
      :list="productsListChanged"
      :per="3"
    >
      <div class="row">
          <div class="shadow">
              <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 inlineBlock" >
                  <div class="box-customn"
                       v-for="product in paginated('productsListChanged')">
                      <div class="img-wrap-tailor">
                          <a href="#" class="nohover"><img :src="product.image1" alt="product" /></a>
                          <a href="#" class="onhover"><img :src="product.image2" alt="product" /></a>
                          <span> <a :href="'/product/' + product.id">Quick View </a></span>
                      </div>
                      <div class="imfo-area">
                          <h3> {{product.name | to-uppercase}} </h3>
                          <p>{{product.description | snippet}}</p>
                          <h4>{{product.price}}</h4>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </paginate>
    <!--THIS IS 'ul > li'-->
    <div class="row">
      <paginate-links class="pagination col-md-6 col-md-offset-3"
        for="productsListChanged"
        :show-step-links="true"
        :step-links="{
          next: 'Next',
          prev: 'Prev'
        }"
      ></paginate-links>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  data() {
    return {
      productsList: [],
      productsListChanged: [],
      searchQuery: '',
      selectedSorting: '',
      paginate: ['productsListChanged'],// npm module vue-paginate
      minPrice: 0,
      maxPrice: 0
    }
  },
  
  methods: {
    searchByProductName: function() {
      this.productsListChanged = this.productsList.filter((product) => {
        const name = product.name.toLowerCase();
        return name.match(this.searchQuery.toLowerCase());
      })
    },
    resetPriceFilter: function() {
      this.minPrice = 0;
      const prices = _.map(this.productsListChanged, 'price');
      this.maxPrice = Math.max(...prices);
      this.productsListChanged = this.productsList;
    },
    sortProductsByPrice: function() {
      this.productsListChanged = _.orderBy(this.productsList, ['price'], [this.selectedSorting]);
    },
    filterProductsByPrice: function () {
      const minPrice = parseInt(this.minPrice, 10);
      const maxPrice = parseInt(this.maxPrice, 10);

      this.productsListChanged = this.productsList.filter((product) => {
        return (product.price > minPrice) &&
          (product.price < maxPrice);
      });
    }
  },

  created() {
    this.$http.get('/src/schema/product_list.json').then((item) => {
        this.productsList = item.data;
        this.productsListChanged = this.productsList;
        this.resetPriceFilter();
    });
  },
}
</script>

<style lang="css">
.dropdown.dropdown-lg .dropdown-menu {
    margin-top: -1px;
    padding: 6px 20px;
}
.input-group-btn .btn-group {
    display: flex !important;
}
.btn-group .btn {
    border-radius: 0;
    margin-left: -1px;
}
.btn-group .btn:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}
.btn-group .form-horizontal .btn[type="submit"] {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.form-horizontal .form-group {
    margin-left: 0;
    margin-right: 0;
}
.form-group .form-control:last-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}

@media screen and (min-width: 768px) {
    #adv-search {
        width: 500px;
        margin: 0 auto;
    }
    .dropdown.dropdown-lg {
        position: static !important;
    }
    .dropdown.dropdown-lg .dropdown-menu {
        min-width: 500px;
    }
}
</style>
