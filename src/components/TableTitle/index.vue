<template>
  <div class="d-flex justify-content-between align-items-center my-2">
    <div />
    <div>
      <div class="text-center">
        <h2>{{ title }}</h2>
      </div>
    </div>
    <div>
      <div
        v-if="btns"
        class="my-3"
      >
        <el-button
          v-if="addBtn"
          :disabled="$store.state.Loading.loading"
          class="mr-3"
          type="primary"
          @click="openDialog({method:'add'})"
        >
          新增資料<i class="ml-2 el-icon-edit" />
        </el-button>
        <el-button
          :disabled="selection.length === 0 || $store.state.Loading.loading"
          class="mr-3"
          type="danger"
          @click="deleteHandler"
        >
          刪除<i class="ml-2 el-icon-delete" />
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableTitle',
  props: {
    title: {
      type: String,
      required: true,
    },
    btns: {
      type: Boolean,
      default: true,
    },
    addBtn: {
      type: Boolean,
      default: true,
    },
    isSearch: {
      type: Boolean,
      default: true,
    },
    selection: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    openDialog(type) {
      this.$emit('openDialog', type);
    },
    deleteHandler() {
      this.$emit('deleteHandler');
    },
  },
};
</script>
