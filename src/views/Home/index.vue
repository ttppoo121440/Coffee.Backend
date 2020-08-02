<template>
  <div class="home text-center">
    <Loading :active.sync="$store.state.Loading.loading" />
    <h1>首頁</h1>
  </div>
</template>

<script>

export default {
  name: 'Home',
  mounted() {
    this.$store.dispatch('Login/CheckLogin');
  },
};
</script>
