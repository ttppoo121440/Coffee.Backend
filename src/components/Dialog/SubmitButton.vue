<template>
  <div style="display: inline-block">
    <el-form-item
      v-for="item in submitButton"
      :key="item.name"
    >
      <el-button
        v-if="$store.state.Dialog.dialogIsEdit"
        :disabled="!changed || !valid"
        type="primary"
        @click="submit"
      >
        {{ item.name }}
      </el-button>
      <el-button
        v-else
        :disabled="!valid"
        type="primary"
        @click="submit"
      >
        {{ item.name }}
      </el-button>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "SubmitButton",
  props: {
    submitButton: {
      type: Array,
      required: true,
    },
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
      this.$emit("submit", value);
    },
  },
};
</script>
