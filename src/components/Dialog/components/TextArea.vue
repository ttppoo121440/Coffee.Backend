<template>
  <ValidationProvider
    v-slot="{ errors }"
    :name="title"
    :style="{width: styles}"
    :rules="rules"
  >
    <el-input
      v-model="bindingValue"
      autosize
      type="textarea"
      :clearable="true"
      :class="{'error':errors[0]}"
    />
    <span class="text-danger">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'TextArea',
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
textarea{
  width: 100%;
}
</style>
