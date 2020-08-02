<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Login from '@/storeModule/Login';

export default {
  name: 'App',
  mounted() {
    this.$registerModule(this.$store, { Login });
  },
  beforeDestroy() {
    this.$unregisterModule(this.$store, ['Login']);
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
