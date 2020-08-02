<template>
  <div class="home text-center">
    <Loading :active.sync="$store.state.Loading.loading" />
    <h1>首頁</h1>
  </div>
</template>

<script>

export default {
  name: 'Home',
  async mounted() {
    const login = await this.$store.dispatch('Login/CheckLogin');
    if (login === 422) {
      this.$router.push('/login');
    }
  },
};
</script>
