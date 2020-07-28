<template>
  <el-main>
    <transition name="el-zoom-in-center">
      <router-view />
    </transition>
  </el-main>
</template>

<script>
export default {
  name: "Main",
};
</script>
