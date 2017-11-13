export default {
  data() {
    return {
      minPrice: 0,
      maxPrice: 0,
      searchQuery: '',
      selectedSorting: '',
    };
  },
  methods: {
    resetPriceFilter() {
      this.$store.dispatch('RESET_PRICE_FILTER');
    },
    filterProductsByPrice() {
      this.$store.dispatch('FILTER_PRODUCTS_BY_PRICE', {
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
      });
    },
    sortProductsByPrice() {
      this.$store.dispatch('SORT_PRODUCTS_BY_PRICE', this.selectedSorting);
    },
    searchByProductName() {
      this.$store.dispatch('SEARCH_BY_PRODUCT_NAME', this.searchQuery);
    },
  },
};
