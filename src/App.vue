<template>
  <div id="app">
    <div class="weui-loadmore" v-if="loading">
      <i class="weui-loading"></i>
      <span class="weui-loadmore__tips">正在加载</span>
    </div>
    <router-view v-else/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  metaInfo: {
    title: '就业系统',
    titleTemplate: '就业系统 - %s',
  },
  async mounted() {
    // const res = await this.load();
    // this.$checkRes(res, () => {});
  },
  computed: {
    ...mapState(['loading']),
  },
};
</script>

<style scoped>
.weui-loadmore {
  position: absolute;
  top: 40%;
  width: 100%;
}
</style>
