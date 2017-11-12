<!--components/Home.vue-->
<template lang="html">
  <div class="container">
    <hr>

    <div  class="row ">
      <div class="input-group">
          <span class="input-group-addon">$</span>
          <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" v-model="minPrice" @change="filterProductsByPrice($event)">
      </div>
      <div class="input-group">
          <span class="input-group-addon">$</span>
          <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" v-model="maxPrice" @change="filterProductsByPrice($event)">
      </div>
      <div class="input-group">
         <select v-model="selected" @change="sortProducts($event)" class="form-control"  name="hero">
           <option value="" disabled selected>select sort price</option>
            <option selected value="asc">Sort 1...100 price by ascending</option>
            <option value="desc">Sort 100...1 price by descending</option>
        </select>
      </div>
    </div>
    <hr>

    <paginate
      name="filterProducts"
      :list="products"
      :per="4"
    >
    <div class="row">

<div class="shadow">
		<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12 inlineBlock" >
        <div class="box-customn"  v-for="product in paginated('filterProducts')">
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
      for="filterProducts"

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
      products: [],
      search: '',
      selected: '',
      paginate: ['filterProducts'],
      minPrice: 0,
      maxPrice: 0
    }
  },
  methods: {
    sortProducts: function(event)  {
      this.products = _.orderBy(this.products, ['price'], [event.currentTarget.value]);
    },

    filterProductsByPrice: function(event) {
      
      var price = event.currentTarget.value;
      debugger
    }
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

.shadow{width:100%; float:left;box-shadow:0 0 10px #000;}
.img-wrap-tailor a{display:block}
.img-wrap-tailor{    width: 100%;
float: left;
overflow: hidden;
height: 300px;
position: relative;}
.img-wrap-tailor span{    position: absolute;
background: #ff6600;
width: 100%;
left: 0;
bottom: 0;
text-align: center;
padding: 5px 0;
font-size: 19px;
color: #fff;}
.box-customn{    width: 100%;
float: left;
border: 1px solid #ccc;
margin: 15px 10px;box-shadow:0 0 5px #000;}
.box-customn .imfo-area{width:100%; float:left;text-align:center;}
.box-customn .imfo-area h3{    margin: 0px;
padding: 0px;
color: #0c0c0c;
font-size: 21px;
line-height: 30px;
font-weight: 600;
text-transform: uppercase;}
.box-customn .imfo-area p{margin: 0px;padding:5px 0px;font-size:14px;}
.box-customn .imfo-area h4{color: #ff0000;
font-weight: bold;
line-height: 30px;
font-size: 25px;}
.img-wrap-tailor img{max-width:100%;}
.box-customn a.onhover{display:none;}
.box-customn:hover a.onhover{display:block;position:absolute;top:0px;left:0px;}
.box-customn:hover a.nohover{display:none;}
.inlineBlock {width: 100%; display: inline-flex; margin-right: 15px;}
.pagination {
    display: inline-block;
    padding-left: 0;
    margin: 20px 0;
    border-radius: 4px;
    float: right;
}
</style>
