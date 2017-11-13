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

    <paginate
      name="productsListChanged"
      :list="productsListChanged"
      :per="4"
    >
      	<!-- product -->
        <!-- <div  class="col-xs-12 col-md-6 bootstrap snippets" v-for="product in paginated('productsListChanged')">
	<div class="product-content product-wrap clearfix">
		<div class="row"  >
				<div class="col-md-5 col-sm-12 col-xs-12" >
					<div class="product-image"> 
						<img :src="product.image" alt="194x228" class="img-responsive"> 
						<span class="tag2 hot">
							HOT
						</span> 
					</div>
				</div>
				<div class="col-md-7 col-sm-12 col-xs-12">
				<div >
						<h5 class="name">
							<a href="#">
								 {{product.name | to-uppercase}} <span>Phone</span>
							</a>
						</h5>
						<p class="price-container">
							<span>{{product.price}}</span>
						</p>
						<span class="tag1"></span> 
				</div>
				<div class="description">
					<p>{{product.description | snippet}} </p>
				</div>
				<div class="product-info smart-form">
					<div class="row">
						<div class="col-md-6 col-sm-6 col-xs-6"> 
							<a href="javascript:void(0);" class="btn btn-success">Add to cart</a>
						</div>
						<div class="col-md-6 col-sm-6 col-xs-6">
							<div class="rating">
								<label for="stars-rating-5"><i class="fa fa-star"></i></label>
								<label for="stars-rating-4"><i class="fa fa-star"></i></label>
								<label for="stars-rating-3"><i class="fa fa-star text-primary"></i></label>
								<label for="stars-rating-2"><i class="fa fa-star text-primary"></i></label>
								<label for="stars-rating-1"><i class="fa fa-star text-primary"></i></label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
  </div> -->
	<!-- end product -->
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
@import url("./style.css");
</style>
