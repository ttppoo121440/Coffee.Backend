<template>
  <div id="app">
    <layout />
  </div>
</template>

<script>
import layout from "@/layout";

export default {
  name: "App",
  components: {
    layout,
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
