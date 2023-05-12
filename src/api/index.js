import Vue from "vue";
import login from "./login";
import post from "./post";
import circle from "./circle";

const api = {
  ...login,
  ...post,
  ...circle
};

Vue.prototype.$api = api;
export default api;
