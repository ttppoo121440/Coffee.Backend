<template>
  <ValidationProvider
    v-slot="{ errors }"
    :name="title"
    :style="{width: styles}"
    :rules="rules"
  >
    <el-date-picker
      v-model="bindingValue"
      type="date"
      value-format="yyyy-MM-dd HH:mm:ss"
      :default-value="bindingValue"
      :class="{'error':errors[0]}"
      placeholder="選擇日期"
    />
    <span class="text-danger">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'Date',
  props: {
    title: {
      type: String,
      required: true,
    },
    styles: {
      type: String,
      default: '',
    },
    rules: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    bindingValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('update:value', value);
      },
    },
  },
};
</script>

<style>
</style>
