<template>
  <div class="contain">
    <div class="login">
      <div class="header">
        <Loading :active.sync="$store.state.Loading.loading" />
        Login
      </div>
      <LoginForm @Login="LoginHandler" />
    </div>
  </div>
</template>

<script>
import {
  initThemeColor,
} from '@/utils/themeColorClient';
import LoginForm from './components/LoginForm';

export default {
  name: 'Login',
  components: {
    LoginForm,
  },
  mounted() {
    initThemeColor();
  },
  methods: {
    LoginHandler(from) {
      this.$store.dispatch('Login/Login', from);
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/_functions.scss";
@import "~@/assets/scss/_variables.scss";

.contain {
  height: 100vh;
  background-image: linear-gradient(145deg,$primary, $white);
}
</style>
