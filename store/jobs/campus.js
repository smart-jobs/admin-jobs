import Vue from 'vue';
import qs from 'qs';
import assert from 'assert';
import * as types from './.mutation.js';
import config from '@/utils/config.js';
const { pageSize = 10 } = config;

const api = {
  query: '/jobs/campus/query',
  review: '/jobs/campus/review',
  update: '/jobs/campus/update',
  fetch: '/jobs/campus/fetch',
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
  async review({ commit }, { status, id }) {
    const res = await this.$axios.$post(`${api.review}?id=${id}`, { status });
    if(res.errcode === 0)
      commit(types.UPDATED, { status, id });
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
};
