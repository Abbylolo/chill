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
      <el-menu-item index="User" v-if="isLogin">个人主页</el-menu-item>
      <!-- 未登录显示 -->
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
      <!-- 已登录显示 -->
      <el-menu-item
        v-if="isLogin"
        style="right: 120px;position: absolute;cursor: pointer;"
        disabled
      >
        {{ userName }}
      </el-menu-item>
      <el-menu-item
        v-if="isLogin"
        style="right: 70px;position: absolute;cursor: pointer;"
        disabled
      >
        <img
          style="width: 40px;height: 40px;border-radius:100px;"
          :src="avatarUrl"
        />
      </el-menu-item>
      <el-menu-item
        v-if="isLogin"
        style="right: 30px;position: absolute;cursor: pointer;"
        disabled
      >
        <img
          src="@/assets/images/icons/exit.svg"
          style="height: 25px;"
          @click="exit()"
        />
      </el-menu-item>
    </el-menu>
    <!-- 登录注册弹窗 -->
    <div style="position: absolute;z-index: 100;">
      <el-dialog
        title="登录"
        :visible.sync="showLogin"
        width="35%"
        :modal="false"
        :destroy-on-close="true"
      >
        <login @loginRes="loginRes"></login>
      </el-dialog>
      <el-dialog
        title="注册"
        :visible.sync="showRegister"
        width="35%"
        :modal="false"
        :destroy-on-close="true"
      >
        <register @registerRes="registerRes"></register>
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
      activeIndex: "Homepage",
      avatarUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    };
  },
  methods: {
    // 退出登录
    exit() {
      this.$confirm("确认退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$message({
          type: "info",
          message: "退出登录"
        });
        this.isLogin = false;
        this.$store.commit("LOGIN", {});
        window.sessionStorage.setItem("username", "");
        window.sessionStorage.setItem("userId", "");
        window.sessionStorage.setItem("brief", "");
        window.sessionStorage.setItem("avatarUrl", "");
        // 退出登录路由跳转到社区首页
        this.$router.push({ name: "Homepage" });
        this.$router.go(0);
      });
    },
    loginRes(userInfo) {
      this.showLogin = false;
      if (userInfo) {
        this.isLogin = true;
        this.userName = userInfo.userName;
        this.avatarUrl =
          userInfo.avatarUrl ||
          "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
      }
      this.$router.push({ name: "Homepage" });
      this.$router.go(0);
    },
    registerRes(userInfo) {
      this.showRegister = false;
      if (userInfo) {
        this.isLogin = true;
        this.userName = userInfo.userName;
        this.avatarUrl =
          userInfo.avatarUrl ||
          "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
      }
      this.$router.push({ name: "Homepage" });
      this.$router.go(0);
    },
    handleSelect(routeName) {
      this.$router.push({
        name: routeName
      });
    }
  },
  mounted() {
    this.isLogin = window.sessionStorage.getItem("userId");
    this.userName = window.sessionStorage.getItem("username");
    this.avatarUrl = window.sessionStorage.getItem("avatarUrl");
    console.log("this.$route", this.$route);
    // this.activeIndex = this.$route.path;
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

/deep/.el-dialog {
  border-radius: 10px;
}
</style>
