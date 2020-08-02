<template>
  <div class="table-page my-3">
    <el-pagination
      v-if="showPage"
      :current-page="current"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    showPage: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      pageSizes: [10, 25, 50, 100],
      current: 1,
    };
  },
  computed: {
    totalPages() {
      return this.$store.state.Pagination.total_pages;
    },
    total() {
      return this.$store.state.Pagination.total;
    },
    pageSize() {
      return this.$store.state.Pagination.paged;
    },
  },
  methods: {
    handleSizeChange(value) {
      this.$emit('handleSizeChange', value);
    },
    handleCurrentChange(value) {
      this.$emit('handleCurrentChange', value);
    },
  },
};
</script>
