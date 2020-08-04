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
    />
  </div>
</template>

<script>
import Coupons from '@/storeModule/Coupons';

export default {
  name: 'Coupons',
  data() {
    return {
      title: '優惠卷列表',
      selection: [],
    };
  },
  computed: {
    tableTitlePost() {
      return {
        title: this.title,
        selection: this.selection,
      };
    },
    tableViewPost() {
      return {
        title: this.title,
        data: this.$store.state.Coupons.tableData,
        columns: this.$store.state.Coupons.columns,
      };
    },
    dialogPost() {
      return {
        title: this.$store.state.Dialog.dialogTitle,
        'rule-form': this.$store.state.Coupons.ruleForm,
        'form-data': this.$store.state.Coupons.formData,
        'is-edit': this.$store.state.Dialog.dialogIsEdit,
        'v-if': this.$store.state.Dialog.dialogVisible,
      };
    },
  },
  created() {
    this.$registerModule(this.$store, { Coupons });
  },
  mounted() {
    this.$store.commit('Pagination/SET_CURRENT', 1);
    this.$store.dispatch('Coupons/getCoupon');
  },
  beforeDestroy() {
    this.$unregisterModule(this.$store, ['Coupons']);
  },
  methods: {
    // 顯示 10 / 25 / 50 / 100 事件
    handleSizeChange(totalPages) {
      this.$store.commit('Pagination/SET_PAGED', totalPages);
      this.$store.dispatch('Coupons/getCoupon');
    },
    // table 第幾頁 事件
    handleCurrentChange(current) {
      this.$store.commit('Pagination/SET_CURRENT', current);
      this.$store.dispatch('Coupons/getCoupon');
    },
    // 給予checkbox資料
    setSelection(data) {
      this.selection = data;
    },
    // 選擇到的checkbox 刪除事件
    deleteHandler() {
      this.selection.forEach((item) => {
        this.$store.dispatch('Coupons/deleteCoupon', item.id);
      });
    },
    openDialog(type) {
      this.$store.dispatch('Coupons/open', { type });
      this.$store.dispatch('Coupons/updateOpen', { type });
      this.$store.dispatch('Coupons/deleteOpen', { type });
    },
    // Dialog 提交事件
    submitForm(isValid, type) {
      if (isValid) {
        if (type === 'add') {
          this.$store.dispatch('Coupons/createCoupon');
        } else {
          this.$store.dispatch('Coupons/editCoupon');
        }
      }
    },
  },
};
</script>
