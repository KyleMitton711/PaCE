import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import user from "./modules/user";
import project from "./modules/project";
import resource from "./modules/resource";
import tag from "./modules/tag";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Sidebar_drawer: null,
    Customizer_drawer: false,
    SidebarColor: "white", //Change Sidebar Color || 'white', | "#2b2b2b" | "rgb(44, 59, 164)" | "rgb(96, 44, 164)" | "rgb(151, 210, 219)" | "rgb(77, 86, 100)"
    SidebarBg: "",
    navbarColor: "primary",
    setHorizontalLayout: false, // Horizontal layout
  },
  mutations: {
    SET_SIDEBAR_DRAWER(state, payload) {
      state.Sidebar_drawer = payload;
    },
    SET_CUSTOMIZER_DRAWER(state, payload) {
      state.Customizer_drawer = payload;
    },
    SET_SIDEBAR_COLOR(state, payload) {
      state.SidebarColor = payload;
    },
    SET_NAVBAR_COLOR(state, payload) {
      state.navbarColor = payload;
    },
    SET_LAYOUT(state, payload) {
      state.setHorizontalLayout = payload;
    },
  },
  actions: {},
  getters: {},
  namespace: true,
  modules: {
    auth,
    project,
    resource,
    user,
    tag
  }
});
