export default {
  namespaced: true,
  state: {
    loading: false,
  },
  mutations: {
    LOADING(state, status) {
      state.loading = status;
    },
  },
};
