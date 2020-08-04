<script>
import { messageBox } from '@/plugins/ElementUI';
import Input from './components/Input';
import TextArea from './components/TextArea';
import CheckBox from './components/CheckBox';
import SwitchBox from './components/SwitchBox';
import NumberInput from './components/NumberInput';
import Select from './components/Select';
import Upload from './components/Upload';
import Radio from './components/Radio';
import SubmitButton from './components/SubmitButton';
import Date from './components/Date';
import Transfer from './components/Transfer';
import ColorPicker from './components/ColorPicker';
import Pic from './components/Pic';

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
    TextArea,
    CheckBox,
    SwitchBox,
    Upload,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    ruleForm: {
      type: [Array, Object],
      required: true,
    },
    rules: {
      type: String,
      default: '',
    },
    formData: { type: Object, default: () => [] },
    title: {
      type: String,
      required: true,
    },
    dialogWidth: { type: String, default: '50%' },
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
        this.$emit('update:visible', false);
      },
    },
  },
  methods: {
    upload(data) {
      this.$emit('upload', data);
    },
    async submit() {
      const isValid = await this.$refs.observer.validate();
      this.$emit('submit', isValid, this.$store.state.Dialog.dialogIsEdit === true ? 'edit' : 'add');
    },
    async dialogClose(done) {
      let result;
      try {
        result = await messageBox('確認關閉？');
        done();
        this.$emit('dialogCloseHandler', done);
      } catch (error) {
        result = error;
      }
      return result;
    },
  },
};
</script>

<template src="./template.html" />
<style src="./style.css"></style>
