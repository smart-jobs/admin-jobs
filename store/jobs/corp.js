import Vue from 'vue';
import qs from 'qs';
import assert from 'assert';
import * as types from './.mutation.js';
import config from '@/utils/config.js';
const { pageSize = 10 } = config;

const api = {
  queryReg: '/jobs/corp/reg/query',
  reviewReg: (id)=>`/jobs/corp/reg/${id}/review`,
  updateReg: (id)=>`/jobs/corp/reg/${id}/update`,
  fetchReg: (id)=>`/jobs/corp/reg/${id}/details`,
  queryInfo: '/jobs/corp/info/query',
  fetchInfo: (id)=>`/jobs/corp/info/${id}/details`,
  updateInfo: (id)=>`/jobs/corp/info/${id}/update`,
}
// initial state
export const state = () => ({
  items: [], 
  current: null,
  total: 0,
});

// actions
export const actions = {
  async queryReg({ commit }, { status, corpname, paging = {} }) {
    const { page = 1, size = pageSize } = paging;
    const skip = Math.max(0, (page-1)*size);
    const param = qs.stringify({status, skip, size});
    const res = await this.$axios.$get(`${api.queryReg}?${param}`)
    if(res.errcode === 0) {
      commit(types.LOADED, res);
    }
    return res;
  },
  async reviewReg({ commit }, { id, status, remark }) {
    const res = await this.$axios.$post(api.reviewReg(id), { status, remark });
    if(res.errcode === 0)
      commit(types.UPDATED, res.data);
    return res;
  },
  async updateReg({ commit }, payload) {
    const { id } = payload;
    const res = await this.$axios.$post(api.reviewReg(id), payload);
    if(res.errcode === 0)
      commit(types.UPDATED, res.data);
    return res;
  },
  async fetchReg({ commit }, { id }) {
    const res = await this.$axios.$get(api.fetchReg(id));
    if(res.errcode === 0)
      commit(types.SELECTED, res.data);
    return res;
  },
  async queryInfo({ commit }, { status, corpname, paging = {} }) {
    const { page = 1, size = pageSize } = paging;
    const skip = Math.max(0, (page-1)*size);
    const param = qs.stringify({status, corpname, skip, size});
    const res = await this.$axios.$get(`${api.queryInfo}?${param}`)
    if(res.errcode === 0) {
      commit(types.LOADED, res);
    }
    return res;
  },
  async fetchInfo({ commit }, { id }) {
    const res = await this.$axios.$get(api.fetchInfo(id));
    if(res.errcode === 0)
      commit(types.SELECTED, res.data);
    return res;
  },
  async updateInfo({ commit }, payload) {
    const { id } = payload;
    const res = await this.$axios.$post(api.reviewReg(id), payload);
    if(res.errcode === 0)
      commit(types.UPDATED, res.data);
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
