export default {
  namespaced: true,
  state: {
    dialogVisible: false,
    dialogIsEdit: false,
    dialogMethod: "",
    dialogTitle: null,
  },
  actions: {

  },
  mutations: {
    DIALOG(state, status) {
      state.dialogVisible = status;
    },
    DIALOG_ADD(state, status) {
      state.dialogIsEdit = false;
      state.dialogVisible = true;
      state.dialogMethod = "add";
      state.dialogTitle = status;
    },
    DIALOG_EDIT(state, status) {
      state.dialogIsEdit = true;
      state.dialogVisible = true;
      state.dialogMethod = "edit";
      state.dialogTitle = status;
    },
    CLEAR_DIALOG(state) {
      state.dialogVisible = false;
    },
  },
};
