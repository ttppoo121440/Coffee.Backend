<template>
  <ValidationProvider
    v-slot="{ errors }"
    :name="title"
    :style="{width: styles}"
    :rules="rules"
  >
    <el-checkbox
      v-model="bindingValue"
      :class="{'error':errors[0]}"
    />
    <span class="text-danger">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'CheckBox',
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
      type: Boolean,
      required: true,
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
