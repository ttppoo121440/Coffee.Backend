<template>
  <div class="d-flex justify-content-between align-items-center my-2">
    <div>
      <el-form
        label-position="right"
        label-width="80px"
      >
        <el-form-item label="搜尋">
          <el-input
            prefix-icon="el-icon-search"
            :clearable="true"
            placeholder="搜尋"
          />
        </el-form-item>
      </el-form>
    </div>
    <div>
      <div class="text-center">
        <h2>{{ title }}</h2>
      </div>
    </div>
    <div>
      <div class="my-3">
        <el-button
          class="mr-3"
          type="primary"
          @click="openDialog({method:'add'})"
        >
          新增資料<i class="ml-2 el-icon-edit" />
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableBar",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    openDialog(type) {
      this.$emit("openDialog", type);
    },
  },
};
</script>

<style>

</style>
