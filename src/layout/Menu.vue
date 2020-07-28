<template>
  <el-menu
    style="border:0px"
    :default-active="$route.path"
    class="el-menu-vertical-demo h-100 "
    :collapse="isCollapse"
    background-color="#222d32"
    text-color="#fff"
    active-text-color="#ffd04b"
    :router="true"
  >
    <template v-for="menu in subMenu">
      <el-submenu
        v-if="!menu.router"
        :key="menu.id"
        :index="menu.id"
      >
        <template slot="title">
          <i class="el-icon-location" />
          <span>{{ menu.title }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="item in menu.titleItem"
            :key="item.id"
            :index="item.router"
          >
            <v-icon
              style="width:16px"
              class="mr-2"
              :name="item.icon"
            />{{
              item.title
            }}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item
        v-else
        :key="menu.id"
        :index="menu.router"
      >
        <v-icon
          style="width:16px"
          class="mr-2"
          :name="menu.icon"
        />
        <span slot="title">{{ menu.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: "Menu",
  props: {
    isCollapse: {
      type: Boolean,
      required: true,
    },
    subMenu: {
      type: Array,
      required: true,
    },
  },
};
</script>
