import Vue from 'vue';
import qs from 'qs';
import assert from 'assert';
import * as types from '../.mutation.js';
import config from '@frame/config';
const { pageSize = 10 } = config;

const api = {
  query: '/jobs/jobfair/ticket/query',
};
// initial state
export const state = () => ({
  items: [],
  current: null,
  total: 0,
});

// actions
export const actions = {
  async query({ commit }, { fair_id, 'verify.status': status, paging = {} }) {
    const { page = 1, size = pageSize } = paging;
    const skip = Math.max(0, (page - 1) * size);
    const param = { fair_id, 'verify.status': status, skip, limit: size };
    const res = await this.$axios.$get(api.query, param);
    if (res.errcode === 0) {
      commit(types.LOADED, res);
    }
    return res;
  },
};

// mutations
export const mutations = {
  [types.LOADED](state, { data, total }) {
    state.items = data;
    state.total = total;
  },
};

export const namespaced = true;
