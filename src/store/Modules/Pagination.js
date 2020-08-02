export default {
  namespaced: true,
  state: {
    current: 1,
    paged: 10,
    total: 0,
    total_pages: 0,
  },
  mutations: {
    SET_CURRENT(state, status) {
      state.current = status;
    },
    SET_PAGED(state, status) {
      state.paged = status;
    },
    SET_TOTAL(state, status) {
      state.total = status;
    },
    SET_TOTAL_PAGES(state, status) {
      state.total_pages = status;
    },
  },
};
