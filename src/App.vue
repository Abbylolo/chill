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
      <el-menu-item
        v-if="!isLogin"
        style="right: 90px;position: absolute;cursor: pointer;"
        disabled
      >
        <span @click="showLogin = true">登录</span>
      </el-menu-item>
      <el-menu-item
        style="right: 40px;position: absolute;cursor: pointer;"
        v-if="!isLogin"
        disabled
      >
        <span @click="showRegister = true">注册</span>
      </el-menu-item>
      <el-menu-item
        v-if="isLogin"
        style="right: 90px;position: absolute;cursor: pointer;"
        disabled
      >
        {{ userName }}
      </el-menu-item>
      <el-menu-item
        v-if="isLogin"
        style="right: 40px;position: absolute;cursor: pointer;"
        disabled
      >
        <img style="width: 40px;" src="@/assets/images/icons/avatar.svg" />
      </el-menu-item>
    </el-menu>
    <div style="position: absolute;z-index: 100;">
      <el-dialog
        title="登录"
        :visible.sync="showLogin"
        width="35%"
        :modal="false"
        :destroy-on-close="true"
      >
        <login @loginRes="showLogin = false"></login>
      </el-dialog>
      <el-dialog
        title="注册"
        :visible.sync="showRegister"
        width="35%"
        :modal="false"
        :destroy-on-close="true"
      >
        <register @registerRes="showRegister = false"></register>
      </el-dialog>
    </div>
    <router-view />
  </div>
</template>

<script>
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
export default {
  name: "App",
  components: { Login, Register },
  data() {
    return {
      showLogin: false,
      showRegister: false,
      isLogin: false,
      userName: "Abbylolo",
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
