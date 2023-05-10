import Vue from "vue";
import Vuex from "vuex";

import test from "./test";

Vue.use(Vuex);

// 准备actions —— 用于响应组件中的动作(写业务逻辑)
const actions = {};

// 准备mutations —— 用于操作数据（state）
const mutations = {
  LOGIN(state, value) {
    state.user = value;
  }
};

// 准备state —— 用于存储数据 (data)
const state = {
  user: {} // 用户信息
};

// 准备getters —— 用于将state中的数据进行加工 (computed)
const getters = {};

const store = new Vuex.Store({
  actions,
  mutations,
  state,
  getters,
  modules: {
    test
  }
});

export default store;
