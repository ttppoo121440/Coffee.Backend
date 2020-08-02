import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import lang from 'element-ui/lib/locale/lang/zh-TW';
import locale from 'element-ui/lib/locale';
import {
  Button,
  Select,
  Upload,
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
  ColorPicker,
  CheckboxGroup,
  Loading,
  MessageBox,
  DatePicker,
  Transfer,
  Submenu,
  Image,
  Switch,
  Notification,
  Card,
} from 'element-ui';

[
  Image,
  Transfer,
  DatePicker,
  Upload,
  Button,
  Submenu,
  Select,
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
  ColorPicker,
  CheckboxGroup,
  Loading,
  Switch,
  Card,
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
  text = '此操作將永久刪除該資料，是否繼續？',
  type = 'warning',
  title = '提示',
) {
  return MessageBox.confirm(text, title, {
    confirmButtonText: '確定',
    cancelButtonText: '取消',
    type,
  });
}
