export default {
  namespaced: true,
  state: {
    loading: false,
  },
  actions: {
    updateLoading({ commit }, status) {
      commit("LOADING", status);
    },
  },
  mutations: {
    LOADING(state, status) {
      state.loading = status;
    },
  },
};
