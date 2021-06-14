import { createStore } from "vuex";
import Cart from "./cart";

export default createStore({
  state: {
    loginStatus: false,
    isLoading: false,
  },
  mutations: {
    setLoginStatus(state, payload) {
      state.loginStatus = payload;
    },
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
  },
  actions: {},
  modules: {
    Cart,
  },
});
