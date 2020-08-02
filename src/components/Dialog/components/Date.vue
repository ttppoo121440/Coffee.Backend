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
      :default-value="nowDate"
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
  data() {
    return {
      nowDate: this.$moment().format('YYYY-MM-DD HH:mm:ss'),
    };
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
    timeDefault() {
      const now = this.$moment().format('YYYY-MM-DD HH:mm:ss');
      return now;
    },
  },
  mounted() {
    if (this.value === '') {
      this.bindingValue = this.timeDefault;
    }
  },
};
</script>

<style>
</style>
