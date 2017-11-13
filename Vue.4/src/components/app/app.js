import search from '../search/search.vue';
import product from '../product/product.vue';

export default {
  components: {
    search,
    product,
  },
  data() {
    return {

    };
  },
  mounted() {
    this.$store.dispatch('SET_PRODUCT_LIST').then(() => {
      this.$store.dispatch('RESET_PRICE_FILTER');
    });
  },
};

