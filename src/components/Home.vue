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
        <div  class="col-xs-12 col-md-6 bootstrap snippets" v-for="product in paginated('productsListChanged')">
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
  </div>
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

.product-content {
    border: 2px solid #dfe5e9;
    margin-bottom: 20px;
    margin-top: 12px;
    background: #fff;
    padding: 4px;
        -webkit-box-shadow: 0 1px 4px 0 rgba(0,0,0,0.37);
    box-shadow: 0 1px 4px 0 rgba(0,0,0,0.37);
}

.product-content .carousel-control.left {
    margin-left: 0
}

.product-content .product-image {
    background-color: #fff;
    display: block;
    min-height: 238px;
    overflow: hidden;
    position: relative
}

.product-content .product-deatil {
    border-bottom: 1px solid #dfe5e9;
    padding-bottom: 17px;
    padding-left: 16px;
    padding-top: 16px;
    position: relative;
    background: #fff
}

.product-content .product-deatil h5 a {
    color: #2f383d;
    font-size: 15px;
    line-height: 19px;
    text-decoration: none;
    padding-left: 0;
    margin-left: 0
}

.product-content .product-deatil h5 a span {
    color: #9aa7af;
    display: block;
    font-size: 13px
}

.product-content .product-deatil span.tag1 {
    border-radius: 50%;
    color: #fff;
    font-size: 15px;
    height: 50px;
    padding: 13px 0;
    position: absolute;
    right: 10px;
    text-align: center;
    top: 10px;
    width: 50px
}

.product-content .product-deatil span.sale {
    background-color: #21c2f8
}

.product-content .product-deatil span.discount {
    background-color: #71e134
}

.product-content .product-deatil span.hot {
    background-color: #fa9442
}

.product-content .description {
    font-size: 12.5px;
    line-height: 20px;
    padding: 10px 14px 16px 19px;
    background: #fff
}

.product-content .product-info {
    padding: 11px 19px 10px 20px
}

.product-content .product-info a.add-to-cart {
    color: #2f383d;
    font-size: 13px;
    padding-left: 16px
}

.product-content name.a {
    padding: 5px 10px;
    margin-left: 16px
}

.product-info.smart-form .btn {
    padding: 6px 12px;
    margin-left: 12px;
    margin-top: -10px
}

.product-entry .product-deatil {
    border-bottom: 1px solid #dfe5e9;
    padding-bottom: 17px;
    padding-left: 16px;
    padding-top: 16px;
    position: relative
}

.product-entry .product-deatil h5 a {
    color: #2f383d;
    font-size: 15px;
    line-height: 19px;
    text-decoration: none
}

.product-entry .product-deatil h5 a span {
    color: #9aa7af;
    display: block;
    font-size: 13px
}

.load-more-btn {
    background-color: #21c2f8;
    border-bottom: 2px solid #037ca5;
    border-radius: 2px;
    border-top: 2px solid #0cf;
    margin-top: 20px;
    padding: 9px 0;
    width: 100%
}

.product-block .product-deatil p.price-container span,
.product-content .product-deatil p.price-container span,
.product-entry .product-deatil p.price-container span,
.shipping table tbody tr td p.price-container span,
.shopping-items table tbody tr td p.price-container span {
    color: #21c2f8;
    font-family: Lato, sans-serif;
    font-size: 24px;
    line-height: 20px
}

.product-info.smart-form .rating label {
    margin-top: 0
}

.product-wrap .product-image span.tag2 {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    padding: 10px 0;
    color: #fff;
    font-size: 11px;
    text-align: center
}

.product-wrap .product-image span.sale {
    background-color: #57889c
}

.product-wrap .product-image span.hot {
    background-color: #a90329
}

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
