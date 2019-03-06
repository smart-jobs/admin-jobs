import * as dict from '@lib/store/naf/dict';
import * as types from './.mutation';
import util from '@lib/utils/user-util';

export const modules = {
  naf: {
    namespaced: true,
    modules: {
      dict,
    },
  },
};
export const state = () => {
  return {
    loading: true,
    platform: 'school',
    userinfo: util.user,
    unit: null,
    unitName: null,
  };
};

export const mutations = {
  [types.LOADED](state) {
    state.userinfo = util.user;
    const { unit } = util.user;
    if (unit) {
      state.platform = 'school';
      state.unit = unit.code;
      state.unitName = unit.name;
    } else {
      state.platform = 'master';
      state.unit = null;
      state.unitName = '中心';
    }
    state.loading = false;
  },
};
export const actions = {
  async init({ commit }) {
    console.log('call init...');
    commit(types.LOADED);
  },
};
export const getters = {
  userinfo: state => state.userinfo,
  platform: state => state.platform,
};
