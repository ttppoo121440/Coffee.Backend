<script>
import { messageBox } from "@/plugins/ElementUI";
import Input from "./Input";
import NumberInput from "./NumberInput";
import Select from "./Select";
import Radio from "./Radio";
import SubmitButton from "./SubmitButton";
import Date from "./Date";
import Transfer from "./Transfer";
import ColorPicker from "./ColorPicker";
import Pic from "./Pic";

export default {
  components: {
    Transfer,
    Date,
    Input,
    NumberInput,
    Select,
    Radio,
    ColorPicker,
    SubmitButton,
    Pic,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    ruleForm: {
      type: Object,
      required: true,
    },
    rules: {
      type: String,
      default: "",
    },
    data: { type: [Array, Object], default: () => [] },
    tree: { type: [Array, Object], default: () => [] },
    submitButton: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    dialogWidth: { type: String, default: "50%" },
  },
  data() {
    return {
      tempData: [],
    };
  },
  computed: {
    Visible: {
      get() {
        return this.visible;
      },
      set() {
        this.$emit("update:visible", false);
      },
    },
  },
  methods: {
    async submit() {
      const isValid = await this.$refs.observer.validate();
      this.$emit("submit", isValid);
    },
    dialogClose(done) {
      messageBox("確認關閉？").then(() => {
        done();
        this.$emit("dialogCloseHandler", done);
      });
    },
  },
};
</script>

<template src="./template.html" />
<style src="./style.css"></style>
