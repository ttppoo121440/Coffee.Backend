<template>
  <div>
    <TableTitle
      v-bind="tableTitlePost"
      @openDialog="openDialog"
      @deleteHandler="deleteHandler"
    />
    <Table-view
      ref="TableView"
      v-bind="tableViewPost"
      @btnHandle="openDialog"
      @row-selection="setSelection"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    />
    <Dialog
      :visible.sync="$store.state.Dialog.dialogVisible"
      v-bind="dialogPost"
      @submit="submitForm"
      @upload="upload"
    />
  </div>
</template>

<script>
import Product from '@/storeModule/Product';

export default {
  name: 'Products',
  data() {
    return {
      title: '產品列表',
      selection: [],
      textarea1: '',
    };
  },
  computed: {
    tableViewPost() {
      return {
        title: this.title,
        data: this.$store.state.Product.tableData,
        columns: this.$store.state.Product.columns,
      };
    },
    dialogPost() {
      return {
        'v-if': this.$store.state.Dialog.dialogVisible,
        title: this.$store.state.Dialog.dialogTitle,
        'rule-form': this.$store.state.Product.ruleForm,
        'form-data': this.$store.state.Product.formData,
        'is-edit': this.$store.state.Dialog.dialogIsEdit,
      };
    },
    tableTitlePost() {
      return {
        title: this.title,
        selection: this.selection,
      };
    },
  },
  created() {
    this.$registerModule(this.$store, { Product });
  },
  mounted() {
    this.$store.commit('Pagination/SET_CURRENT', 1);
    this.$store.dispatch('Product/getProduct');
  },
  beforeDestroy() {
    this.$unregisterModule(this.$store, ['Product']);
  },
  methods: {
    // 顯示 10 / 25 / 50 / 100 事件
    handleSizeChange(totalPages) {
      this.$store.commit('Pagination/SET_PAGED', totalPages);
      this.$store.dispatch('Product/getProduct');
    },
    // table 第幾頁 事件
    handleCurrentChange(current) {
      this.$store.commit('Pagination/SET_CURRENT', current);
      this.$store.dispatch('Product/getProduct');
    },
    // 上傳事件
    upload(data) {
      this.$store.dispatch('Product/uploadPic', data);
    },
    // 給予checkbox資料
    setSelection(data) {
      this.selection = data;
    },
    // 選擇到的checkbox 刪除事件
    deleteHandler() {
      this.selection.forEach((item) => {
        this.$store.dispatch('Product/deleteProduct', item.id);
      });
    },
    async openDialog(type) {
      this.$store.dispatch('Product/open', { type });
      await this.$store.dispatch('Product/updateOpen', { type });
      this.$store.dispatch('Product/deleteOpen', { type });
    },
    // Dialog 提交事件
    submitForm(isValid, type) {
      if (isValid) {
        if (type === 'add') {
          this.$store.dispatch('Product/createProduct');
        } else {
          this.$store.dispatch('Product/editProduct');
        }
      }
    },
  },
};
</script>
