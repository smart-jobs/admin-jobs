import Vue from 'vue';
import qs from 'qs';
import assert from 'assert';
import * as types from './.mutation.js';
import config from '@/utils/config.js';
const { pageSize = 10 } = config;

const api = {
  review: '/jobs/jobfair/create',
  update: '/jobs/jobfair/update',
  query: '/jobs/jobfair/query',
  fetch: '/jobs/jobfair/fetch',
}
// initial state
export const state = () => ({
  items: [], 
  current: null,
  total: 0,
});

// actions
export const actions = {
  async query({ commit }, { status, corpname, paging = {} }) {
    const { page = 1, size = pageSize } = paging;
    const skip = Math.max(0, (page-1)*size);
    const param = qs.stringify({status, skip, size});
    const res = await this.$axios.$get(`${api.query}?${param}`)
    if(res.errcode === 0) {
      commit(types.LOADED, res);
    }
    return res;
  },
  async create({ commit }, { status, id }) {
    const res = await this.$axios.$post(`${api.create}`, { status });
    if(res.errcode === 0)
      commit(types.CREATED, { status, id });
    return res;
  },
  async update({ commit }, { status, id }) {
    const res = await this.$axios.$post(`${api.update}?id=${id}`, { status });
    if(res.errcode === 0)
      commit(types.UPDATED, { status, id });
    return res;
  },
  async fetch({ commit }, { id }) {
    const res = await this.$axios.$get(`${api.fetch}?id=${id}`);
    if(res.errcode === 0)
      commit(types.SELECTED, res.data);
    return res;
  },
};

// mutations
export const mutations = {
  [types.LOADED](state, {data, total}) {
    state.items = data;
    state.total = total;
  },
  [types.SELECTED](state, payload) {
    state.current = payload;
  },
  [types.UPDATED](state, payload) {
    const idx = state.items.findIndex(p=>p._id === payload._id);
    Vue.set(state.items, idx, payload);
  },
  [types.CREATED](state, payload) {
    state.items.push(payload);
  },
};
