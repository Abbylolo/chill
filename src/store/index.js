import Vue from "vue";
import Vuex from "vuex";

import text from "./test";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    text
  }
});

export default store;
