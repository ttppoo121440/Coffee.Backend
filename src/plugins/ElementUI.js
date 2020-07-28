import Vue from "vue";
import "element-ui/lib/theme-chalk/index.css";
import lang from "element-ui/lib/locale/lang/zh-TW";
import locale from "element-ui/lib/locale";
import {
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Select,
  Upload,
  Tree,
  OptionGroup,
  Table,
  TableColumn,
  Pagination,
  Dialog,
  Menu,
  Container,
  Header,
  Aside,
  Main,
  Row,
  Col,
  MenuItem,
  MenuItemGroup,
  Input,
  Checkbox,
  Form,
  FormItem,
  Option,
  Radio,
  RadioGroup,
  ColorPicker,
  CheckboxGroup,
  Loading,
  Notification,
  MessageBox,
  DatePicker,
  Transfer,
  Submenu,
  Image,
} from "element-ui";

[
  Image,
  Dropdown,
  Transfer,
  DatePicker,
  DropdownMenu,
  DropdownItem,
  Tree,
  Upload,
  Button,
  Submenu,
  Select,
  OptionGroup,
  Table,
  TableColumn,
  Pagination,
  Dialog,
  Menu,
  Container,
  Header,
  Aside,
  Main,
  Row,
  Col,
  MenuItem,
  MenuItemGroup,
  Input,
  Checkbox,
  Form,
  FormItem,
  Option,
  Radio,
  RadioGroup,
  ColorPicker,
  CheckboxGroup,
  Loading,
].forEach((element) => {
  Vue.use(element);
});

locale.use(lang);

Vue.prototype.$confirm = (done) => {
  done();
};

export function notify(title, message, type) {
  Notification({
    title,
    message,
    type,
  });
}

export function messageBox(
  text = "此操作將永久刪除該資料，是否繼續？",
  type = "warning",
  title = "提示",
) {
  return MessageBox.confirm(text, title, {
    confirmButtonText: "確定",
    cancelButtonText: "取消",
    type,
  });
}
