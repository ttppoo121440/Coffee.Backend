import {
  getCoupon, createCoupon, getSingleCoupon, deleteCoupon,
  editCoupon,
} from '@/utils/api';
import { messageBox, notify } from '@/plugins/ElementUI';
import CouponForm from '@/utils/Adapter/Coupon/CouponForm';
import CouponList from '@/utils/Adapter/Coupon/CouponList';

const moment = require('moment');

export default {
  namespaced: true,
  state: () => ({
    // table 資料
    columns: Object.freeze([
      {
        name: '全選',
        type: 'selection',
      },
      {
        name: '名稱',
        desc: 'title',
      },
      {
        name: '序號',
        desc: 'code',
      },
      {
        name: '折扣百分比',
        desc: 'percent',
      },
      {
        name: '是否開放',
        desc: 'enabled',
        formatter: (row) => {
          if (row) {
            return '<p class="text-success">啟用</p>';
          }
          return '<p class="text-danger">未啟用</p>';
        },
      },
      {
        name: '到期日',
        desc: 'deadline_at',
        formatter: (row) => moment(row).format('YYYY-MM-DD'),
      },
      {
        name: '操作',
        width: '150',
        btns: [
          {
            name: '修改',
            btnType: 'warning',
            method: 'edit',
          },
          {
            name: '刪除',
            btnType: 'danger',
            method: 'delete',
          },
        ],
      },
    ]),
    // 表單資料
    formData: {
      title: '',
      code: '',
      percent: 0,
      deadline_at: '',
      enabled: false,
    },
    // 表單 規則資料
    ruleForm: Object.freeze([
      {
        name: '名稱',
        clearable: true,
        type: 'Input',
        prop: 'title',
        rules: 'required',
        required: true,
      },
      {
        name: '序號',
        clearable: true,
        type: 'Input',
        prop: 'code',
        rules: 'required',
        required: true,
      },
      {
        name: '折扣百分比',
        clearable: true,
        type: 'NumberInput',
        prop: 'percent',
        rules: 'required|integer',
        required: true,
        max: 2,
      },
      {
        name: '到期日',
        clearable: true,
        prop: 'deadline_at',
        type: 'Date',
      },
      {
        name: '是否開放',
        clearable: true,
        type: 'SwitchBox',
        prop: 'enabled',
        rules: 'required',
      },
    ]),
    tableData: [],
  }),
  actions: {
    // 取得 優惠卷資料
    async getCoupon({ commit, rootState }) {
      commit('Loading/LOADING', true, {
        root: true,
      });
      await getCoupon(`page=${rootState.Pagination.current}&paged=${rootState.Pagination.paged}`).then((res) => {
        commit('Pagination/SET_TOTAL', res.meta.pagination.total, {
          root: true,
        });
        commit('Pagination/SET_TOTAL_PAGES', res.meta.pagination.total_pages, {
          root: true,
        });
        // 資料轉換層
        const Adapter = new CouponList(res.data);
        commit('GET_TABLE_DATA', Adapter.transform());
        commit('Loading/LOADING', false, {
          root: true,
        });
      });
    },
    // 取得 單一優惠卷資料
    async getSingleCoupon({ commit }, id) {
      commit('Loading/LOADING', true, {
        root: true,
      });
      await getSingleCoupon(id).then((res) => {
        // 資料轉換層
        const Adapter = new CouponForm(res.data);
        commit('SET_FORM_DATA', Adapter.transform());
        commit('Loading/LOADING', false, {
          root: true,
        });
      });
    },
    // 新增 優惠卷
    async createCoupon({ state, commit, dispatch }) {
      commit('Loading/LOADING', true, {
        root: true,
      });
      await createCoupon(state.formData).then(() => {
        commit('Loading/LOADING', false, {
          root: true,
        });
        notify('訊息', '新增成功', 'success');
        commit('Dialog/CLEAR_DIALOG', false, {
          root: true,
        });
        dispatch('getCoupon');
      });
    },
    // 修改 優惠卷資料
    async editCoupon({ state, dispatch, commit }) {
      commit('Loading/LOADING', true, {
        root: true,
      });
      await editCoupon(state.formData.id, state.formData).then(() => {
        commit('Loading/LOADING', false, {
          root: true,
        });
        notify('訊息', '修改成功', 'success');
        commit('Dialog/CLEAR_DIALOG', false, {
          root: true,
        });
        dispatch('getCoupon');
      });
    },
    // 刪除 優惠卷資料
    async deleteCoupon({ commit, dispatch }, id) {
      commit('Loading/LOADING', true, {
        root: true,
      });
      await deleteCoupon(id).then(() => {
        notify('訊息', '删除成功', 'success');
        commit('Loading/LOADING', false, {
          root: true,
        });
        dispatch('getCoupon');
      });
    },
    open({ commit }, { type }) {
      if (type.method === 'add') {
        commit('INIT_FORM_DATA');
        commit('Dialog/DIALOG_ADD', '新增資料', {
          root: true,
        });
      }
    },
    async updateOpen({ commit, dispatch }, { type }) {
      if (type.method === 'edit') {
        await dispatch('getSingleCoupon', type.row.id);
        commit('Dialog/DIALOG_EDIT', '修改文章', {
          root: true,
        });
      }
    },
    deleteOpen({ dispatch }, { type }) {
      if (type.method === 'delete') {
        messageBox().then(() => {
          dispatch('deleteCoupon', type.row.id);
        }).catch(() => {
          notify('info', '已取消删除', 'info');
        });
      }
    },
  },
  mutations: {
    GET_TABLE_DATA(state, status) {
      state.tableData = Object.freeze(status);
    },
    INIT_FORM_DATA(state) {
      state.formData = {
        title: '',
        code: '',
        percent: 0,
        deadline_at: '',
        enabled: false,
      };
    },
    SET_FORM_DATA(state, status) {
      state.formData = status;
    },
  },
};
