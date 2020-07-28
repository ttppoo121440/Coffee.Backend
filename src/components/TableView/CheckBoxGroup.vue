<template>
  <div class="filter-container my-3">
    <el-checkbox-group v-model="bindingValue">
      <el-checkbox
        v-for="column in data"
        :key="column.name"
        :label="column.name"
      >
        {{ column.name }}
      </el-checkbox>
      {{ data }}
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: "CheckBoxGroup",
  props: {
    value: {
      type: Array,
      required: true,
    },
    data: {
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
