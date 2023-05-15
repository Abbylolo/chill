import Vue from "vue";
import Router from "vue-router";
// pages为文件夹=》pages目录下package.json文件main字段指定的js文件不存在 =》index.js存在 =》执行（.js优先级 〉.vue）
import { Homepage, PhotoCircle, PhotoCircleDetail, User } from "@/pages";
// import Homepage from "@/pages/Homepage";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Homepage",
      meta: {
        title: "摄影社区"
      },
      component: Homepage
    },
    {
      path: "/photo-circle",
      name: "PhotoCircle",
      component: PhotoCircle,
      meta: {
        title: "摄影圈"
      }
    },
    {
      path: "/photo-circle-detail/:circleId",
      name: "PhotoCircleDetail",
      component: PhotoCircleDetail,
      meta: {
        title: "摄影圈详情页"
      }
    },
    {
      path: "/user",
      name: "User",
      title: "个人主页",
      component: User
    }
  ]
});

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
