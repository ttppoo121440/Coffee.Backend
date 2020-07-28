<template>
  <el-color-picker
    v-model="mainColor"
    size="small"
    :predefine="predefineColors"
    @change="changeColor"
  />
</template>

<script>
import {
  changeThemeColor,
  initThemeColor,
} from "@/utils/themeColorClient";

export default {
  name: "ThemePicker",
  data() {
    return {
      mainColor: localStorage.getItem("theme_color") || "#409EFF",
      predefineColors: [
        "#409EFF",
        "#ffb6b9",
        "#8ac6d1",
        "#F0D879",
        "#f9bcdd",
        "#6abe83",
        "#ff6768",
        "#2C2C2C",
      ],
    };
  },
  created() {
    initThemeColor();
  },
  methods: {
    changeColor(newColor) {
      changeThemeColor(newColor);
    },
  },
};
</script>
