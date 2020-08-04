import { getOrder, setOrderPaid, setOrderUnpaid } from '@/utils/api';
import { notify } from '@/plugins/ElementUI';
import OrderList from '@/utils/Adapter/Order/OrderList';

const moment = require('moment');

export default {
  namespaced: true,
  state: () => ({
    // table 資料
    columns: Object.freeze([
      {
        name: '訂單日期',
        desc: 'time',
        formatter: (row) => moment(row).format('YYYY-MM-DD'),
        sortable: true,
      },
      {
        name: '產品',
        desc: 'product',
      },
      {
        name: '訂單金額',
        desc: 'amount',
      },
      {
        name: '是否付款',
        desc: 'paid',
        switch: true,
      },
    ]),
    tableData: [],
  }),
  actions: {
    // 取得 訂單資料
    async getOrder({ commit, rootState }) {
      commit('Loading/LOADING', true, {
        root: true,
      });
      const result = await getOrder(`page=${rootState.Pagination.current}&paged=${rootState.Pagination.paged}`);
      commit('Pagination/SET_TOTAL', result.meta.pagination.total, {
        root: true,
      });
      commit('Pagination/SET_TOTAL_PAGES', result.meta.pagination.total_pages, {
        root: true,
      });
      const Adapter = new OrderList(result.data);
      commit('GET_TABLE_DATA', Adapter.transform());
      commit('Loading/LOADING', false, {
        root: true,
      });
      return result;
    },
    // 訂單 設定指定訂單為已付款
    async setOrderPaid({ commit }, id) {
      commit('Loading/LOADING', true, {
        root: true,
      });
      const result = await setOrderPaid(id);
      notify('訊息', '此訂單設定付款成功', 'success');
      commit('Loading/LOADING', false, {
        root: true,
      });
      return result;
    },
    // 訂單 設定指定訂單為未付款
    async setOrderUnpaid({ commit }, id) {
      commit('Loading/LOADING', true, {
        root: true,
      });
      const result = await setOrderUnpaid(id);
      notify('訊息', '此訂單設定未付款成功', 'success');
      commit('Loading/LOADING', false, {
        root: true,
      });
      return result;
    },
  },
  mutations: {
    GET_TABLE_DATA(state, status) {
      state.tableData = Object.freeze(status);
    },
  },
};
