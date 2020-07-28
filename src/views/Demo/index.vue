<template>
  <div>
    <TableBar
      :title="title"
      @openDialog="openDialog"
    />
    <Table-view
      ref="TableView"
      :title="title"
      :data="$store.state.Demo.tableData"
      :columns="$store.state.Demo.columns"
      @handleBtnClick="openDialog"
    />
    <Dialog
      v-if="$store.state.Dialog.dialogVisible"
      :title="$store.state.Dialog.dialogTitle"
      :visible.sync="$store.state.Dialog.dialogVisible"
      :rule-form="$store.state.Demo.ruleForm"
      :data="$store.state.Demo.formData"
      :is-edit="$store.state.Dialog.dialogIsEdit"
      :submit-button="$store.state.Demo.submitBtn"
      @submit="submitForm"
    />
  </div>
</template>

<script>
import TableView from "@/components/TableView/index";
import Dialog from "@/components/Dialog/index";
import TableBar from "./TableBar";

export default {
  components: { TableView, Dialog, TableBar },
  data() {
    return {
      title: "Demo",
    };
  },
  mounted() {
    this.$store.dispatch("Demo/getData");
  },
  methods: {
    submitForm(isValid) {
      if (isValid) {
        console.log(this.$store.state.Demo.ruleForm);
      }
    },
    openDialog(type) {
      this.$store.dispatch("Demo/open", { type });
      this.$store.dispatch("Demo/updateOpen", { type });
      this.$store.dispatch("Demo/deleteOpen", { type });
    },
  },
};
</script>
