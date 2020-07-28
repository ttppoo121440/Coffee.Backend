import Vue from "vue";
import Vuex from "vuex";
import Loading from "./Loading";
import Demo from "./Demo";
import Dialog from "./Dialog";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Loading,
    Demo,
    Dialog,
  },
});
