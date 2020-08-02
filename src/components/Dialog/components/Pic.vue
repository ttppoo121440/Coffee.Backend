<template>
  <el-image
    v-loading="$store.state.Loading.loading"
    style="width: 100px; height: 100px"
    :src="src"
    fit="fill"
    :lazy="true"
  />
</template>

<script>
export default {
  name: 'Pic',
  props: {
    src: {
      type: String,
      default: '',
    },
  },
};
</script>
