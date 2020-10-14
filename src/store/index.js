import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    goodsPageNum: 1,
    goodsPageSize: 4,
    orderPageNum: 1,
    orderPageSize: 8,
    noticePageNum: 1,
    noticePageSize: 2
  },
  actions: {},
  modules: {}
});
