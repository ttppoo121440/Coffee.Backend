<template>
  <ValidationProvider
    v-slot="{ errors }"
    :name="title"
    :style="{width: styles}"
    :rules="rules"
  >
    <el-input
      v-model.number="bindingValue"
      :clearable="true"
      show-word-limit
      :maxlength="max"
      :class="{'error':errors[0]}"
    />
    <span class="text-danger">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
export default {
  name: "NumberInput",
  props: {
    title: {
      type: String,
      required: true,
    },
    styles: {
      type: String,
      default: "",
    },
    rules: {
      type: String,
      required: true,
    },
    value: {
      type: [Number, String],
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },
  computed: {
    bindingValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("update:value", value);
      },
    },
  },
};
</script>

<style>
</style>
