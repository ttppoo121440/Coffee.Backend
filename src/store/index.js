import Vue from 'vue';
import Vuex from 'vuex';
import Loading from './Modules/Loading';
import Pagination from './Modules/Pagination';
import Dialog from './Modules/Dialog';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Loading,
    Dialog,
    Pagination,
  },
});
