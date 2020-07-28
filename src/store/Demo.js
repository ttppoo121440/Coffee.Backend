import { getData } from "@/utils/api";
import { messageBox, notify } from "@/plugins/ElementUI";
import DemoAdapter from "@/utils/Adapter/DemoAdapter.js";

export default {
  namespaced: true,
  state: {
    columns: [
      {
        name: "大頭照",
        desc: "pic",
        img: true,
      },
      {
        name: "姓名",
        desc: "name",
      },
      {
        name: "年齡",
        desc: "age",
      },
      {
        name: "性別",
        desc: "gender",
      },
      {
        name: "操作",
        width: "150",
        btns: [
          {
            name: "修改",
            btnType: "warning",
            method: "edit",
          },
          {
            name: "刪除",
            btnType: "danger",
            method: "delete",
          },
        ],
      },
    ],
    ruleForm: {
      name: "",
      age: 18,
      gender: "male",
      src: "https://randomuser.me/api/portraits/women/60.jpg",
      publish: "",
    },
    formData: [
      {
        name: "姓名",
        clearable: true,
        type: "Input",
        prop: "name",
        rules: "required",
        required: true,
      },
      {
        name: "年齡",
        clearable: true,
        type: "NumberInput",
        prop: "age",
        rules: "required|integer",
        max: 2,
        required: true,
      },
      {
        name: "性別",
        clearable: true,
        type: "Radio",
        prop: "gender",
        rules: "required",
        options: [
          { label: "男", value: "male" },
          { label: "女", value: "female" },
        ],
      },
      {
        name: "時間",
        clearable: true,
        prop: "publish",
        type: "Date",
      },
      {
        name: "圖片",
        type: "Pic",
        prop: "src",
      },
    ],
    tableData: [],
    submitBtn: [
      {
        name: "提交",
      },
    ],
  },
  actions: {
    getData({ commit }) {
      commit("Loading/LOADING", true, {
        root: true,
      });
      getData().then((res) => {
        const Adapter = new DemoAdapter(res.results);
        commit("GET_TABLE_DATA", Adapter.transform());
        commit("Loading/LOADING", false, {
          root: true,
        });
      });
    },
    open({ state, commit }, { type }) {
      if (type.method === "add") {
        console.log(type);
        state.ruleForm = {
          name: "",
          age: 18,
          gender: "male",
          pic: "",
        };
        commit("Dialog/DIALOG_ADD", "新增資料", {
          root: true,
        });
      }
    },
    updateOpen({ state, commit }, { type }) {
      if (type.method === "edit") {
        state.ruleForm = { ...Object.assign(type.row), src: type.row.pic };
        commit("Dialog/DIALOG_EDIT", "修改文章", {
          root: true,
        });
      }
    },
    deleteOpen({ state }, { type }) {
      console.log(type);
      if (type.method === "delete") {
        messageBox()
          .then(() => {
            console.log("刪除", state.ruleForm);
          })
          .catch(() => {
            notify("info", "已取消删除", "info");
          });
      }
    },
  },
  mutations: {
    GET_TABLE_DATA(state, status) {
      state.tableData = status;
    },
  },
};
