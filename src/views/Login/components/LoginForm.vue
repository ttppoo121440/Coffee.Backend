<template>
  <form
    class="form"
    @submit.prevent="$emit('Login',from)"
  >
    <input
      v-model="from.email"
      class="input"
      type="email"
      name="username"
      placeholder="email"
      required
    >
    <input
      v-model="from.password"
      class="input"
      type="password"
      name="password"
      placeholder="PASSWORD"
      required
    >
    <el-button
      type="primary"
      class="w-100"
      native-type="submit"
    >
      登入
    </el-button>
  </form>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      from: {
        email: '',
        password: '',
      },
    };
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/_functions.scss";
@import "~@/assets/scss/_variables.scss";

.login {
  background-color: $white;
  width: 330px;
  padding: 50px;
  border-radius: 15px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.login .header {
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  line-height: 50px;
}

.login .form .input {
  display: block;
  width: 100%;
  margin-bottom: 20px;
  border: 0;
  padding: 10px;
  border-bottom: 1px solid $gray-500;
  outline: none;
}

.login .form .input::placeholder {
  text-transform: uppercase;
}
</style>
