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
  name: "Pagination",
  props: {
    showPage: {
      type: Boolean,
      default: true,
    },
    current: {
      type: Number,
      required: true,
    },
    pageSizes: {
      type: Array,
      required: true,
    },
    pageSize: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  methods: {
    handleSizeChange(value) {
      this.$emit("handleSizeChange", value);
    },
    handleCurrentChange(value) {
      this.$emit("handleCurrentChange", value);
    },
  },
};
</script>

<style>

</style>
