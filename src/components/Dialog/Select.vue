<template>
  <ValidationProvider
    v-slot="{ errors }"
    :name="title"
    :style="{width: styles}"
    :rules="rules"
  >
    <el-select
      v-model="bindingValue"
      filterable
      :style="{width: styles}"
    >
      <el-option
        label="請選擇"
        :value="0"
      />
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <span class="text-danger">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
export default {
  name: "Select",
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
      default: 0,
    },
    options: {
      type: Array,
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
