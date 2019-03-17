<template>
  <div id="app">
    <div class="weui-loadmore" v-if="loading">
      <i class="weui-loading"></i>
      <span class="weui-loadmore__tips">正在加载</span>
    </div>
    <frame :menuItems="menus" short-name="智慧就业" v-else> </frame>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Frame from '@lib/layouts/frame';

export default {
  components: {
    Frame,
  },
  name: 'App',
  metaInfo: {
    title: '招聘系统',
    titleTemplate: '招聘系统 - %s',
  },
  mounted() {
    this.init();
  },
  computed: {
    ...mapState({
      loading: 'loading',
      platform: 'platform',
      menuItems: state => state.menu.items,
    }),
    menus() {
      if (this.menuItems) {
        const filter = p => p.options && (!p.options.platform || p.options.platform === this.platform);
        return this.menuItems.filter(filter).map(p => {
          if (p.children) return { ...p, children: p.children.filter(filter) };
          return p;
        });
      }
      return [];
    },
  },
  methods: {
    ...mapActions(['init']),
  },
};
</script>

<style scoped lang="less">
#app {
  height: 100%;
  //width: 100%;
}
.weui-loadmore {
  position: absolute;
  top: 40%;
  width: 100%;
}
</style>
