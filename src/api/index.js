import Vue from "vue";
import login from "./login";

const api = {
  ...login
};

Vue.prototype.$api = api;
export default api;
