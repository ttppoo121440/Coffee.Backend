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
    getOrder({ commit, rootState }) {
      commit('Loading/LOADING', true, {
        root: true,
      });
      getOrder(`page=${rootState.Pagination.current}&paged=${rootState.Pagination.paged}`).then((res) => {
        commit('Pagination/SET_TOTAL', res.meta.pagination.total, {
          root: true,
        });
        commit('Pagination/SET_TOTAL_PAGES', res.meta.pagination.total_pages, {
          root: true,
        });
        const Adapter = new OrderList(res.data);
        commit('GET_TABLE_DATA', Adapter.transform());
        commit('Loading/LOADING', false, {
          root: true,
        });
      });
    },
    // 訂單 設定指定訂單為已付款
    setOrderPaid({ commit }, id) {
      commit('Loading/LOADING', true, {
        root: true,
      });
      setOrderPaid(id).then(() => {
        notify('訊息', '此訂單設定付款成功', 'success');
        commit('Loading/LOADING', false, {
          root: true,
        });
      });
    },
    // 訂單 設定指定訂單為未付款
    setOrderUnpaid({ commit }, id) {
      commit('Loading/LOADING', true, {
        root: true,
      });
      setOrderUnpaid(id).then(() => {
        notify('訊息', '此訂單設定未付款成功', 'success');
        commit('Loading/LOADING', false, {
          root: true,
        });
      });
    },
  },
  mutations: {
    GET_TABLE_DATA(state, status) {
      state.tableData = Object.freeze(status);
    },
  },
};
