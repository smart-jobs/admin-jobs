import * as Cookies from 'js-cookie';
import * as types from './.menu';

// initial state
// shape: [{ id, quantity }]
export const state = () => ({
  items: [],
  modules: [],
  current: null,
  mode: 'nested', // nested-两层嵌套导航（导航条+导航树）; lite-单一树状导航
  collapse: false,
});

// actions
export const actions = {
  async load({ commit }) {
    try {
      let res = await this.$axios.$get('/menu/load')
      if (res.errcode === 0) {
        commit(types.NAV_MENU_LOADED, res.data);
      }
      return res;
    } catch (err) {
      console.error(err);
      return { errcode: -1, errmsg: err.message || '处理失败' };
    }
  },
  async switchMode({ commit }, payload) {
    commit(types.NAV_SWITCH_MODE, payload);
    if (process.browser) {
      Cookies.set('navMode', payload);
    }
  },
};

// mutations
export const mutations = {
  [types.NAV_MENU_LOADED](state, {items, modules}) {
    state.items = items;
    state.modules = modules;
  },
  [types.NAV_MODULE_SELECTED](state, payload) {
    state.current = payload;
  },
  [types.NAV_SWITCH_MODE](state, payload) {
    state.mode = payload;
  },
  [types.NAV_TOGGLE_COLLAPSE](state, payload) {
    state.collapse = !state.collapse;
  },
};
