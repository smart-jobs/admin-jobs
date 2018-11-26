import * as types from './mutation-types';
const cookieParser = process.server ? require('cookie') : undefined

export const state = () => ({
  platform: 'school',
  unit: null,
  name: null,
})

// actions
export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req, app, error }) {
    console.log('call nuxtServerInit...');
    const tenant = req.headers['x-tenant'] || '99991';
    console.log('x-tenant:', tenant);

    if(tenant !== 'master') {
      const res = await this.$axios.$get(`/naf/unit/fetch?code=${tenant}`);
      if(res && res.errcode) {
        console.error('fetch unit info fail:', res);
        error({ message: res.errmsg });
        return;
      }
      if(!res.data) {
        console.error('fetch unit info fail, invalid code: ', tenant);
        error({ message: '分站信息不存在' });
        return ;
      }
      // console.log(res.data);
      const { name } = res.data;
      commit(types.PLATFORM_INIT, { unit: tenant, name });
    } else {
      commit(types.PLATFORM_INIT, { unit: tenant, name: '中心主站' });
    }

  },
};

export const mutations = {
  [types.PLATFORM_INIT](state, { unit = 'master', name }) {
    state.name = name;
    if(unit === 'master') {
      state.platform = 'master';
      state.unit = null;
    } else {
      state.platform = 'school';
      state.unit = unit;
    }
  },
}

export const getters = {
  platform: state => state.platform,
  isAuthenticated: state => state.login.isAuthenticated,
  userinfo: state => state.login.userinfo,
  access_token: state => state.login.access_token,
  unitcode: state => state.login.unit,
  menuItems: state => state.naf.menu.items,
}