<script>
import CheckBoxGroup from './CheckBoxGroup';
import Pagination from './Pagination';

export default {
  name: 'TableView',
  components: {
    CheckBoxGroup,
    Pagination,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    showPage: {
      type: Boolean,
      default: true,
    },
    columns: { type: Array, default: () => [] },
    title: { type: String, required: true },
  },
  data() {
    return {
      key: 1,
      multipleSelection: [], // 已選中的行
      isUpdateSelection: true, // 是否更新已選中
      checkboxVal: [],
      formThead: [],
    };
  },
  computed: {
    columnsData() {
      return this.columns.map((item) => (item.name !== '全選' ? item : false));
    },
  },
  watch: {
    checkboxVal(valArr) {
      this.formThead = this.columns.filter((i) => valArr.indexOf(i.name) >= 0);
      this.key += 1;
      localStorage.setItem(
        `tableHead_${this.title}`,
        JSON.stringify(this.checkboxVal),
      );
    },
  },
  created() {
    this.tableHead();
  },
  methods: {
    tableHead() {
      if (localStorage.getItem(`tableHead_${this.title}`)) {
        this.checkboxVal = JSON.parse(
          localStorage.getItem(`tableHead_${this.title}`),
        );
      } else {
        [...this.columns].forEach((item, index) => {
          this.checkboxVal.push(item.name);
          if (item.name === this.checkboxVal[index]) {
            this.formThead.push(item);
          }
        });
      }
    },
    changeFun(val) {
      this.$parent.isDisableBtn = val.length;
      if (this.isUpdateSelection) {
        this.multipleSelection = val;
        this.$emit('row-selection', this.multipleSelection);
      } else {
        console.log(this.isUpdateSelection);
        this.isUpdateSelection = true;
      }
    },
    handleSizeChange(totalPages) {
      // 每頁條數改變時觸發
      this.isUpdateSelection = false; // 不更新選中行
      this.totalPages = totalPages;
      this.updateSeletion();
      this.$emit('handleSizeChange', totalPages);
    },
    handleCurrentChange(cur) {
      // 當前頁改變時觸發
      this.isUpdateSelection = false; // 不更新選中行
      this.updateSeletion();
      this.$emit('handleCurrentChange', cur);
    },
    updateSeletion() {
      this.$nextTick(() => {
        this.data.forEach((item) => {
          if (this.multipleSelection.indexOf(item) >= 0) {
            this.isUpdateSelection = false; // 不更新選中行
            this.$refs.multipleTable.toggleRowSelection(item, true); // 選中所在行
          }
        });
        this.isUpdateSelection = true; // 更新選中行
      });
    },
    btnHandle(method, row) {
      this.$emit('btnHandle', { method, row });
    },
    switchHandle(data, row) {
      this.$emit('switchHandle', data, row);
    },
  },
};
</script>
<template src="./template.html" />
<style src="./style.css"></style>
