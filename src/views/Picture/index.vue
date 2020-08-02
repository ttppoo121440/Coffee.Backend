<template>
  <div>
    <TableTitle
      v-bind="tableTitle"
      @openDialog="openDialog"
      @deleteHandler="deleteHandler"
    />
    <Table-view
      ref="TableView"
      v-bind="tableView"
      @btnHandle="openDialog"
      @row-selection="setSelection"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    />
  </div>
</template>

<script>
import Picture from '@/storeModule/Picture';

export default {
  name: 'Picture',
  data() {
    return {
      title: '圖片儲存列表',
      selection: [],
    };
  },
  computed: {
    tableTitle() {
      return {
        title: this.title,
        'add-btn': false,
        'is-search': false,
        selection: this.selection,
      };
    },
    tableView() {
      return {
        title: this.title,
        data: this.$store.state.Picture.tableData,
        columns: this.$store.state.Picture.columns,
      };
    },
  },
  created() {
    this.$registerModule(this.$store, { Picture });
  },
  mounted() {
    this.$store.commit('Pagination/SET_CURRENT', 1);
    this.$store.dispatch('Picture/picList');
  },
  beforeDestroy() {
    this.$unregisterModule(this.$store, ['Picture']);
  },
  methods: {
    // 顯示 10 / 25 / 50 / 100 事件
    handleSizeChange(totalPages) {
      this.$store.commit('Pagination/SET_PAGED', totalPages);
      this.$store.dispatch('Picture/picList');
    },
    // table 第幾頁 事件
    handleCurrentChange(current) {
      this.$store.commit('Pagination/SET_CURRENT', current);
      this.$store.dispatch('Picture/picList');
    },
    // 給予checkbox資料
    setSelection(data) {
      this.selection = data;
    },
    // 選擇到的checkbox 刪除事件
    deleteHandler() {
      this.selection.forEach((item) => {
        this.$store.dispatch('Picture/deletePic', item.id);
      });
    },
    async openDialog(type) {
      this.$store.dispatch('Picture/deleteOpen', { type });
    },
  },
};
</script>
