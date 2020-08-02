<template>
  <div>
    <TableTitle v-bind="tableTitlePost" />
    <Table-view
      v-bind="tableViewPost"
      @switchHandle="switchHandle"
    />
  </div>
</template>

<script>
import Order from '@/storeModule/Order';

export default {
  name: 'Order',
  data() {
    return {
      title: '訂單列表',
    };
  },
  computed: {
    tableTitlePost() {
      return {
        title: this.title,
        btns: false,
        'is-search': false,
      };
    },
    tableViewPost() {
      return {
        title: this.title,
        data: this.$store.state.Order.tableData,
        columns: this.$store.state.Order.columns,
      };
    },
  },
  created() {
    this.$registerModule(this.$store, { Order });
  },
  mounted() {
    this.$store.commit('Pagination/SET_CURRENT', 1);
    this.$store.dispatch('Order/getOrder');
  },
  beforeDestroy() {
    this.$unregisterModule(this.$store, ['Order']);
  },
  methods: {
    // table 是否付款 事件
    switchHandle(isPaid, data) {
      if (isPaid) {
        this.$store.dispatch('Order/setOrderPaid', data.id);
      } else {
        this.$store.dispatch('Order/setOrderUnpaid', data.id);
      }
    },
    // 顯示 10 / 25 / 50 / 100 事件
    handleSizeChange(totalPages) {
      this.$store.commit('Pagination/SET_PAGED', totalPages);
      this.$store.dispatch('Order/getOrder');
    },
    // table 第幾頁 事件
    handleCurrentChange(current) {
      this.$store.commit('Pagination/SET_CURRENT', current);
      this.$store.dispatch('Order/getOrder');
    },
  },
};
</script>
