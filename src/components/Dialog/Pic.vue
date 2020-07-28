<template>
  <div>
    <el-image
      style="width: 100px; height: 100px"
      :src="src"
      fit="fill"
    >
      1
    </el-image>
  </div>
</template>

<script>
export default {
  name: "Pic",
  props: {
    src: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>

</style>
