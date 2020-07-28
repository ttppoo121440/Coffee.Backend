<template>
  <ValidationProvider
    v-slot="{ errors }"
    :name="title"
    :style="{width: styles}"
    :rules="rules"
  >
    <template v-for="item in options">
      <el-radio
        :key="item.value"
        v-model="bindingValue"
        :style="{width: styles}"
        :label="item.value"
      >
        {{ item.label }}
      </el-radio>
    </template>
    <span class="text-danger">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
export default {
  name: "Radio",
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
      type: String,
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
