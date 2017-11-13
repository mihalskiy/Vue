import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import _ from 'lodash';

const PRODUCT_LIST_JSON = '/src/schema/product_list.json';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    productsList: [],
    productsListChanged: [],
    minPrice: 0,
    maxPrice: 0,
  },
  actions: {
    SET_PRODUCT_LIST({ commit }) {
      return axios.get(PRODUCT_LIST_JSON)
        .then((response) => {
          commit('SET_PRODUCT_LIST', { list: response.data });
        });
    },
    FILTER_PRODUCTS_BY_PRICE({ commit }, { minPrice, maxPrice }) {
      commit('FILTER_PRODUCTS_BY_PRICE', { minPrice, maxPrice });
    },
    SORT_PRODUCTS_BY_PRICE({ commit }, selectedSorting) {
      commit('SORT_PRODUCTS_BY_PRICE', selectedSorting);
    },
    SEARCH_BY_PRODUCT_NAME({ commit }, searchQuery) {
      commit('SEARCH_BY_PRODUCT_NAME', searchQuery);
    },
    RESET_PRICE_FILTER({ commit }) {
      commit('RESET_PRICE_FILTER');
    },
  },
  mutations: {
    SET_PRODUCT_LIST: (state, { list }) => {
      state.productsList = list;
      state.productsListChanged = list;
    },
    FILTER_PRODUCTS_BY_PRICE: (state, { minPrice, maxPrice }) => {
      minPrice = parseInt(minPrice, 10);
      maxPrice = parseInt(maxPrice, 10);

      if (maxPrice > 0) {
        state.productsListChanged = state.productsList.filter((product) => {
          return (product.price > minPrice) &&
            (product.price < maxPrice);
        });
      }
    },
    SORT_PRODUCTS_BY_PRICE: (state, selectedSorting) => {
      state.productsListChanged = _.orderBy(state.productsList, ['price'], [selectedSorting]);
    },
    SEARCH_BY_PRODUCT_NAME: (state, searchQuery) => {
      state.productsListChanged = state.productsList.filter((product) => {
        const name = product.name.toLowerCase();
        return name.match(searchQuery.toLowerCase());
      });
    },
    RESET_PRICE_FILTER: (state) => {
      state.productsListChanged = state.productsList;
    },
  },
});

export default store;
