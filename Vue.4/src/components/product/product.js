import { mapState } from 'vuex';

export default {
  data() {
    return {
      paginate: ['productsListChanged'], // npm module vue-paginate
    };
  },
  computed: {
    ...mapState({
      productsListChanged: state => state.productsListChanged,
    }),
  },
};

