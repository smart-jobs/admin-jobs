import Vue from 'vue';
import qs from 'qs';
import assert from 'assert';
import * as types from '../.mutation.js';
import config from '@frame/config';
const { pageSize = 10 } = config;

const api = {
  query: '/jobs/jobfair/corp/query',
  review: '/jobs/jobfair/corp/review',
  fetch: '/jobs/jobfair/corp/fetch',
  create: '/jobs/jobfair/corp/create',
  update: '/jobs/jobfair/corp/update',
  delete: '/jobs/jobfair/corp/delete',
  job_add: '/jobs/jobfair/corp/job/add',
  job_update: '/jobs/jobfair/corp/job/update',
  job_delete: '/jobs/jobfair/corp/job/delete',
};
// initial state
export const state = () => ({
  items: [],
  current: null,
  total: 0,
});

// actions
export const actions = {
  async query({ commit }, { fair_id, status, corpname, paging = {} }) {
    const { page = 1, size = pageSize } = paging;
    const skip = Math.max(0, (page - 1) * size);
    const param = { fair_id, status, corpname, skip, limit: size };
    const res = await this.$axios.$get(api.query, param);
    if (res.errcode === 0) {
      commit(types.LOADED, res);
    }
    return res;
  },
  async review({ commit }, { status, booth, remark, id }) {
    const res = await this.$axios.$post(`${api.review}?id=${id}`, { status, booth, remark });
    if (res.errcode === 0) commit(types.UPDATED, res.data);
    return res;
  },
  async fetch({ commit }, { id }) {
    const res = await this.$axios.$get(`${api.fetch}?id=${id}`);
    if (res.errcode === 0) commit(types.SELECTED, res.data);
    return res;
  },
  async create({ commit }, { fair_id, data }) {
    const res = await this.$axios.$post(api.create, data, { fair_id });
    if (res.errcode === 0) commit(types.CREATED, res.data);
    return res;
  },
  async update({ commit }, { data, id }) {
    const res = await this.$axios.$post(api.update, data, { id });
    if (res.errcode === 0) commit(types.UPDATED, res.data);
    return res;
  },
  async delete({ commit }, { id }) {
    const res = await this.$axios.$post(api.delete, {}, { id });
    if (res.errcode === 0) commit(types.DELETED, { id });
    return res;
  },
  async jobAdd({ commit, state }, { name, count, requirement }) {
    const { id } = state.current;
    const res = await this.$axios.$post(api.job_add, { name, count, requirement }, { id });
    if (res.errcode === 0) commit(types.UPDATED, res.data);
    return res;
  },
  async jobDelete({ commit }, { _id }) {
    const res = await this.$axios.$post(api.job_delete, {}, { job_id: _id });
    if (res.errcode === 0) commit(types.UPDATED, res.data);
    return res;
  },
  async jobUpdate({ commit }, { _id, name, count, requirement }) {
    const res = await this.$axios.$post(api.job_update, { name, count, requirement }, { job_id: _id });
    if (res.errcode === 0) commit(types.UPDATED, res.data);
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
    Vue.set(state.items, idx, payload);
    state.current = payload;
  },
  [types.CREATED](state, payload) {
    state.items.push(payload);
  },
  [types.DELETED](state, { id }) {
    const idx = state.tags.findIndex(p => p.id === id);
    state.tags.splice(idx, 1);
  },
};

export const namespaced = true;
