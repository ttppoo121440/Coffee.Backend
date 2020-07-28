<template>
  <ValidationProvider
    v-slot="{ errors }"
    :name="title"
    :style="{width: styles}"
    :rules="rules"
  >
    <el-transfer
      v-model="bindingValue"
      filterable
      filter-placeholder="請輸入關鍵字"
      :titles="['選擇資料', '確定資料']"
      :data="options"
    />
    <span class="text-danger">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
export default {
  name: "Validation",
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
      default: "",
    },
    value: {
      type: Array,
      default: () => [],
      required: true,
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
