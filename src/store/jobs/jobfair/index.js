import Vue from 'vue';
import qs from 'qs';
import assert from 'assert';
import * as types from '../.mutation.js';
import config from '@frame/config';
const { pageSize = 10 } = config;

const api = {
  create: '/jobs/jobfair/create',
  update: '/jobs/jobfair/update',
  query: '/jobs/jobfair/query',
  fetch: '/jobs/jobfair/fetch',
  corp_count: '/jobs/jobfair/corp/count',
  ticket_count: '/jobs/jobfair/ticket/count',
};
// initial state
export const state = () => ({
  items: [],
  current: null,
  total: 0,
});

// actions
export const actions = {
  async query({ commit, dispatch, rootGetters }, { status, paging = {} }) {
    const { platform } = rootGetters;
    const { page = 1, size = pageSize } = paging;
    const skip = Math.max(0, (page - 1) * size);
    const param = { status, skip, limit: size };
    if (platform === 'master') {
      param._tenant = 'global';
    }
    const res = await this.$axios.$get(api.query, param);
    if (res.errcode === 0) {
      commit(types.LOADED, res);
      res.data.forEach(p => {
        dispatch('corp_count', { fair_id: p.id });
        dispatch('ticket_count', { fair_id: p.id });
      });
    }
    return res;
  },
  async create({ commit }, { data }) {
    const res = await this.$axios.$post(`${api.create}`, data);
    if (res.errcode === 0) commit(types.CREATED, res.data);
    return res;
  },
  async update({ commit }, { data, id }) {
    const { secret } = data;
    if (secret && secret.trim() == '') delete data.secret;
    const res = await this.$axios.$post(`${api.update}?id=${id}`, data);
    if (res.errcode === 0) commit(types.UPDATED, res.data);
    return res;
  },
  async fetch({ commit, rootGetters }, { id }) {
    const { platform } = rootGetters;
    const param = { id };
    if (platform === 'master') {
      param._tenant = 'global';
    }
    const res = await this.$axios.$get(api.fetch, param);
    if (res.errcode === 0) commit(types.SELECTED, res.data);
    return res;
  },
  async corp_count({ commit }, { fair_id }) {
    const res = await this.$axios.$get(api.corp_count, { fair_id });
    if (res.errcode === 0) commit(types.CORP_COUNTED, { fair_id, data: res.data });
    return res;
  },
  async ticket_count({ commit }, { fair_id }) {
    const res = await this.$axios.$get(api.ticket_count, { fair_id });
    if (res.errcode === 0) commit(types.TICKET_COUNTED, { fair_id, data: res.data });
    return res;
  },
};

// mutations
export const mutations = {
  [types.LOADED](state, { data, total }) {
    state.items = data;
    state.total = total;
  },
  [types.SELECTED](state, payload) {
    state.current = payload;
  },
  [types.UPDATED](state, payload) {
    const idx = state.items.findIndex(p => p._id === payload._id);
    if (idx >= 0) {
      const { corp_count, ticket_count } = state.items[idx];
      Vue.set(state.items, idx, payload);
      Vue.set(state.items[idx], 'corp_count', corp_count);
      Vue.set(state.items[idx], 'ticket_count', ticket_count);
    }
  },
  [types.CREATED](state, payload) {
    state.items.push(payload);
  },
  [types.CORP_COUNTED](state, { fair_id, data }) {
    const item = state.items.find(p => p._id === fair_id);
    Vue.set(item, 'corp_count', data);
  },
  [types.TICKET_COUNTED](state, { fair_id, data }) {
    const item = state.items.find(p => p._id === fair_id);
    Vue.set(item, 'ticket_count', data);
  },
};

export const namespaced = true;
