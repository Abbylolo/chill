<template>
  <div id="app">
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
      background-color="#333"
      text-color="#fff"
      active-text-color="#f3f085"
    >
      <el-menu-item disabled>
        <img src="@/assets/logo.png" alt="logo" style="width:32px;" />
      </el-menu-item>
      <el-menu-item index="Homepage">
        社区
      </el-menu-item>
      <el-menu-item index="PhotoCircle">摄影圈</el-menu-item>
      <el-menu-item index="User">个人主页</el-menu-item>
    </el-menu>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      activeIndex: "Homepage"
    };
  },
  methods: {
    handleSelect(routeName) {
      this.$router.push({
        name: routeName
      });
    }
  },
  mounted() {
    console.log("vue", this);
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #f3f085; */
}
</style>

<style lang="less" scoped>
/deep/ .el-menu.el-menu--horizontal {
  border-bottom: none;
  position: fixed;
  width: 100%;
  z-index: 100;
}

/deep/ .el-menu-item.is-disabled {
  opacity: 1;
  cursor: default;
}
</style>
