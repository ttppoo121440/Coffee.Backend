import {
  getProduct, createProduct, getSingleProduct, uploadPic, deleteProduct,
  editProduct,
} from '@/utils/api';
import { messageBox, notify } from '@/plugins/ElementUI';
import ProductList from '@/utils/Adapter/Product/ProductList';
import SingleProductData from '@/utils/Adapter/Product/SingleProductData';
import ProductForm from '@/utils/Adapter/Product/ProductForm';

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
        desc: 'imageUrl',
        img: true,
      },
      {
        name: '產品名稱',
        desc: 'title',
      },
      {
        name: '價錢',
        desc: 'price',
      },
      {
        name: '是否啟用',
        desc: 'enabled',
        formatter: (row) => {
          if (row) {
            return '<p class="text-success">啟用</p>';
          }
          return '<p class="text-danger">未啟用</p>';
        },
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
      category: '',
      origin_price: 0,
      price: 0,
      imageUrl: '',
      content: '',
      description: '',
      enabled: false,
      options: '起司蛋糕',
    },
    // 表單規則資料
    ruleForm: Object.freeze([
      {
        name: '商品名稱',
        clearable: true,
        type: 'Input',
        prop: 'title',
        rules: 'required',
        required: true,
      },
      {
        name: '分類',
        clearable: true,
        type: 'Input',
        prop: 'category',
        rules: 'required',
        required: true,
      },
      {
        name: '原價',
        clearable: true,
        type: 'NumberInput',
        prop: 'origin_price',
        rules: 'required|integer',
        required: true,
      },
      {
        name: '特價',
        clearable: true,
        type: 'NumberInput',
        prop: 'price',
        rules: 'required|integer',
        required: true,
      },
      {
        name: '上傳圖片',
        type: 'Upload',
        prop: 'imageUrl',
        rules: 'mimes:image/*',
        required: true,
      },
      {
        name: '縮圖',
        type: 'Pic',
        img: true,
        prop: 'imageUrl',
      },
      {
        name: '單位',
        clearable: true,
        type: 'Input',
        prop: 'unit',
      },
      {
        name: '贈品',
        type: 'Select',
        prop: 'options',
        options: [
          {
            value: '起司蛋糕',
            label: '起司蛋糕',
          }, {
            value: '巧克力布朗尼',
            label: '巧克力布朗尼',
          }, {
            value: '黑森林蛋糕',
            label: '黑森林蛋糕',
          }, {
            value: '瑞士巧克力慕斯',
            label: '瑞士巧克力慕斯',
          }, {
            value: '馬卡龍',
            label: '馬卡龍',
          },
        ],
      },
      {
        name: '商品敘述',
        clearable: true,
        type: 'TextArea',
        prop: 'content',
        rules: 'required',
        required: true,
      },
      {
        name: '商品說明',
        clearable: true,
        type: 'TextArea',
        prop: 'description',
        rules: 'required',
        required: true,
      },
      {
        name: '是否上架',
        clearable: true,
        type: 'SwitchBox',
        prop: 'enabled',
        rules: 'required',
      },
    ]),
    tableData: [],
  }),
  actions: {
    // 上傳 圖片資料
    uploadPic({ commit }, data) {
      commit('Loading/LOADING', true, {
        root: true,
      });
      return uploadPic(data).then((res) => {
        commit('SET_PIC', res.data.path);
        commit('Loading/LOADING', false, {
          root: true,
        });
      });
    },
    // 取得 產品資料
    getProduct({ commit, rootState }) {
      commit('Loading/LOADING', true, {
        root: true,
      });
      getProduct(`page=${rootState.Pagination.current}&paged=${rootState.Pagination.paged}`).then((res) => {
        commit('Pagination/SET_TOTAL', res.meta.pagination.total, {
          root: true,
        });
        commit('Pagination/SET_TOTAL_PAGES', res.meta.pagination.total_pages, {
          root: true,
        });
        // 資料轉換層
        const Adapter = new ProductList(res.data);
        commit('GET_TABLE_DATA', Adapter.transform());
        commit('Loading/LOADING', false, {
          root: true,
        });
      });
    },
    // 取得 單一產品資料
    getSingleProduct({ commit }, id) {
      commit('Loading/LOADING', true, {
        root: true,
      });
      return getSingleProduct(id).then((res) => {
        // 資料轉換層
        const Adapter = new SingleProductData(res.data);
        commit('SET_FORM_DATA', Adapter.transform());
        commit('Loading/LOADING', false, {
          root: true,
        });
      });
    },
    // 新增 產品
    createProduct({ commit, dispatch, state }) {
      commit('Loading/LOADING', true, {
        root: true,
      });
      // 資料轉換層
      const Adapter = new ProductForm(state.formData);
      createProduct(Adapter.transform()).then(() => {
        commit('Loading/LOADING', false, {
          root: true,
        });
        notify('訊息', '新增成功', 'success');
        commit('Dialog/CLEAR_DIALOG', false, {
          root: true,
        });
        dispatch('getProduct');
      });
    },
    // 修改 產品資料
    editProduct({ state, dispatch, commit }) {
      commit('Loading/LOADING', true, {
        root: true,
      });
      // 資料轉換層
      const Adapter = new ProductForm(state.formData);
      editProduct(state.formData.id, Adapter.transform()).then(() => {
        commit('Loading/LOADING', false, {
          root: true,
        });
        notify('訊息', '修改成功', 'success');
        commit('Dialog/CLEAR_DIALOG', false, {
          root: true,
        });
        dispatch('getProduct');
      });
    },
    // 刪除 產品資料
    deleteProduct({ commit, dispatch }, id) {
      commit('Loading/LOADING', true, {
        root: true,
      });
      deleteProduct(id).then(() => {
        notify('訊息', '删除成功', 'success');
        commit('Loading/LOADING', false, {
          root: true,
        });
        dispatch('getProduct');
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
        await dispatch('getSingleProduct', type.row.id);
        commit('Dialog/DIALOG_EDIT', '修改文章', {
          root: true,
        });
      }
    },
    deleteOpen({ dispatch }, { type }) {
      if (type.method === 'delete') {
        messageBox().then(() => {
          dispatch('deleteProduct', type.row.id);
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
        category: '',
        origin_price: 0,
        price: 0,
        imageUrl: '',
        content: '',
        description: '',
        enabled: false,
        options: '起司蛋糕',
      };
    },
    SET_FORM_DATA(state, status) {
      state.formData = status;
    },
    SET_PIC(state, status) {
      state.formData.imageUrl = status;
    },
  },
};
