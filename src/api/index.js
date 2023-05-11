import Vue from "vue";
import login from "./login";
import post from "./post";

const api = {
  ...login,
  ...post
};

Vue.prototype.$api = api;
export default api;
