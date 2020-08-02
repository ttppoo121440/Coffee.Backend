<template>
  <div style="display: inline-block">
    <el-form-item>
      <el-button
        v-if="$store.state.Dialog.dialogIsEdit"
        :disabled="!changed || $store.state.Loading.loading"
        type="primary"
        @click="submit"
      >
        提交
      </el-button>
      <el-button
        v-else
        :disabled="!valid || $store.state.Loading.loading"
        type="primary"
        @click="submit"
      >
        提交
      </el-button>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'SubmitButton',
  props: {
    valid: {
      type: Boolean,
      default: false,
    },
    changed: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    submit(value) {
      this.$emit('submit', value);
    },
  },
};
</script>
