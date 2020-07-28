<template>
  <el-container style="height: 100vh">
    <el-aside style="width: auto;">
      <Menu
        :is-collapse="isCollapse"
        :sub-menu="subMenu"
      />
    </el-aside>
    <el-container>
      <el-header class="bg-primary">
        <el-row
          :gutter="10"
          class="h-100"
        >
          <el-col
            :span="24"
            class="h-100"
          >
            <div class="grid-content d-flex align-items-center h-100">
              <el-button
                class="mr-auto"
                type="primary"
                :v-model="isCollapse"
                style="border: 1px solid transparent"
                @click="active"
              >
                <v-icon
                  class="text-light"
                  name="bars"
                  scale="2"
                />
              </el-button>
              <el-button
                type="primary"
                class="mr-3"
              >
                登出
              </el-button>
              <ThemePicker />
            </div>
          </el-col>
        </el-row>
      </el-header>
      <Main />
    </el-container>
  </el-container>
</template>

<script>
import ThemePicker from "@/components/ThemePicker/index";
import Menu from "./Menu";
import Main from "./Main";

export default {
  components: {
    ThemePicker,
    Menu,
    Main,
  },
  data() {
    return {
      isCollapse: false,
      subMenu: [
        {
          id: "1",
          title: "首頁管理",
          icon: "th-large",
          titleItem: [
            { title: "Home", icon: "th-large", router: "/" },
          ],
        },
        {
          id: 3,
          title: "About",
          router: "/about",
          icon: "file-word",
        },
        {
          id: 4,
          title: "Demo",
          router: "/demo",
          icon: "bars",
        },
      ],
    };
  },
  computed: {
    menuItemFilter() {
      return this.menuItem;
    },
  },
  methods: {
    active() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.fa-icon {
  width: auto;
  height: 1em;
  max-width: 100%;
  max-height: 100%;
}
.el-button{
  outline: none;
}
</style>
