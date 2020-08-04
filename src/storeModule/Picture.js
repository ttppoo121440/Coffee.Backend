import { picList, deletePic } from '@/utils/api';
import { messageBox, notify } from '@/plugins/ElementUI';

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
        name: '縮圖',
        desc: 'path',
        img: true,
      },
      {
        name: '操作',
        width: '150',
        btns: [
          {
            name: '刪除',
            btnType: 'danger',
            method: 'delete',
          },
        ],
      },
    ]),
    tableData: [],
  }),
  actions: {
    // 取得 圖片資料
    async picList({ commit, rootState }) {
      commit('Loading/LOADING', true, {
        root: true,
      });
      const result = await picList(`page=${rootState.Pagination.current}&paged=${rootState.Pagination.paged}`);
      commit('Pagination/SET_TOTAL', result.meta.pagination.total, {
        root: true,
      });
      commit('Pagination/SET_TOTAL_PAGES', result.meta.pagination.total_pages, {
        root: true,
      });
      commit('GET_TABLE_DATA', result.data);
      commit('Loading/LOADING', false, {
        root: true,
      });
      return result;
    },
    // 刪除 圖片資料
    async deletePic({ commit, dispatch }, id) {
      commit('Loading/LOADING', true, {
        root: true,
      });
      const result = await deletePic(id);
      notify('訊息', '删除成功', 'success');
      commit('Loading/LOADING', false, {
        root: true,
      });
      dispatch('picList');
      return result;
    },
    async deleteOpen({ dispatch }, { type }) {
      if (type.method === 'delete') {
        try {
          await messageBox();
          dispatch('deletePic', type.row.id);
        } catch (error) {
          notify('info', '已取消删除', 'info');
        }
      }
    },
  },
  mutations: {
    GET_TABLE_DATA(state, status) {
      state.tableData = Object.freeze(status);
    },
  },
};
