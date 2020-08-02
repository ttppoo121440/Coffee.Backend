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
      await picList(`page=${rootState.Pagination.current}&paged=${rootState.Pagination.paged}`).then((res) => {
        commit('Pagination/SET_TOTAL', res.meta.pagination.total, {
          root: true,
        });
        commit('Pagination/SET_TOTAL_PAGES', res.meta.pagination.total_pages, {
          root: true,
        });
        commit('GET_TABLE_DATA', res.data);
        commit('Loading/LOADING', false, {
          root: true,
        });
      });
    },
    // 刪除 圖片資料
    async deletePic({ commit, dispatch }, id) {
      commit('Loading/LOADING', true, {
        root: true,
      });
      await deletePic(id).then(() => {
        notify('訊息', '删除成功', 'success');
        commit('Loading/LOADING', false, {
          root: true,
        });
        dispatch('picList');
      });
    },
    deleteOpen({ dispatch }, { type }) {
      if (type.method === 'delete') {
        messageBox().then(() => {
          dispatch('deletePic', type.row.id);
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
  },
};
