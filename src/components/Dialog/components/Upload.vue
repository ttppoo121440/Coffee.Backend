<template>
  <ValidationProvider
    ref="provider"
    v-slot="{ validate,errors }"
    :name="title"
    :style="{width: styles}"
    :rules="rules"
  >
    <div
      class="file-upload-wrapper"
      data-text="上傳圖片"
    >
      <input
        ref="file"
        :disabled="$store.state.Loading.loading"
        name="file-upload-field"
        type="file"
        accept="image/*"
        class="file-upload-field"
        @change="uploadPic"
      >
      <span class="text-danger">{{ errors[0] }}</span>
    </div>
  </validationprovider>
</template>

<script>
export default {
  name: 'Upload',
  props: {
    title: {
      type: String,
      required: true,
    },
    rules: {
      type: String,
      default: '',
    },
    styles: {
      type: String,
      default: '',
    },
  },
  methods: {
    async uploadPic(e) {
      const { valid } = await this.$refs.provider.validate(e);
      if (valid) {
        const uploadedFile = this.$refs.file.files[0];
        if (uploadedFile) {
          const formData = new FormData();
          formData.append('file', uploadedFile);
          await this.$emit('upload', formData);
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/_functions.scss";
@import "@/assets/scss/_variables.scss";
.file-upload-wrapper {
  $defaultColor: $primary;
  $height: 60px;
  border: 1px solid $primary;
  border-radius: 5px 10px 10px 5px;

  position: relative;
  width: 100%;
  height: $height;

  &:after {
    content: attr(data-text);
    font-size: 18px;
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    padding: 10px 15px;
    display: block;
    width: calc(100% - 40px);
    pointer-events: none;
    z-index: 20;
    height: $height - 20px;
    line-height: $height - 20px;
    color: #999;
    border-radius: 5px 10px 10px 5px;
    font-weight: 300;
  }

  &:before {
    content: '上傳';
    position: absolute;
    top: 0;
    right: 0;
    display: inline-block;
    background: $defaultColor;
    color: #fff;
    font-weight: 700;
    z-index: 25;
    font-size: 16px;
    line-height: $height;
    padding: 0 15px;
    text-transform: uppercase;
    pointer-events: none;
    border-radius: 0 5px 5px 0;
  }

   input {
    opacity: 0;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    margin: 0;
    padding: 0;
    display: block;
    cursor: pointer;
    width: 100%;
  }
}
</style>
