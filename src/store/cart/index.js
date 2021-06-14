export default {
  namespaced: true,
  state: {
    productsData: [],
  },
  mutations: {
    addProductsData(state, data) {
      state.productsData = [...state.productsData, data];
    },
    deleteProductsData(state, data) {
      state.productsData = state.productsData.filter(
        (item) => item.id !== data.id
      );
    },
  },
  actions: {},
};
