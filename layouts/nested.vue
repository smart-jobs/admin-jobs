<!--嵌套页面布局，包括完整的header、footer、边栏和面包屑-->
<template>
  <el-container class="layout" direction="vertical">
    <el-header class="header" :height="layout.headerHeight" :style="{lineHeight: layout.headerHeight}">
      <naf-header :short-name="name" :logo-width="asideWidth" :menu-collapse="menuCollapse" :nav-mode="navMode" @toggle-menu="toggleMenu" @switch-mode="switchMode" :menu-items="navModules" />
    </el-header>
    <el-main style="padding: 0;display: flex;">
      <el-container class="main">
        <el-aside :width="asideWidth" class="sider">
          <el-scrollbar>
            <naf-sider :menu-items="menuItems" :style="{width: asideWidth}" theme="light" :is-collapse="menuCollapse" />
          </el-scrollbar>
        </el-aside>
        <el-main class="content">
          <el-scrollbar>
            <div class="bread" :height="layout.breadHeight">
              <naf-bread></naf-bread>
            </div>
            <div class="page">
              <transition>
                <nuxt />
              </transition>
            </div>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-main>
    <el-footer class="footer" height="layout.footerHeight">
      <naf-footer></naf-footer>
    </el-footer>
  </el-container>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
import config from '@/config';
import NafHeader from '@naf/frame/header';
import NafFooter from '@naf/frame/footer';
import NafSider from '@naf/frame/sider';
import NafBread from '@naf/frame/bread';
import * as types from '@/store/naf/.menu';

const { mapState, mapActions, mapMutations } = createNamespacedHelpers('naf/menu');

const defaultConfig = {
  breadHeight: '24px',
  headerHeight: '64px',
  footerHeight: '48px',
  asideExpandWidth: '256px',
  asideCollapseWidth: '64px'
};

const { layout = {} } = config;
export default {
  middleware: 'auth',
  components: {
    NafHeader,
    NafFooter,
    NafSider,
    NafBread
  },
  data() {
    return {
      name: config.shortName,
      layout: { ...defaultConfig, ...layout }
    };
  },
  methods: {
    ...mapMutations({
      toggleMenu: types.NAV_TOGGLE_COLLAPSE,
    }),
    ...mapActions(['switchMode']),
  },
  computed: {
    ...mapState({
      navMode: 'mode',
      navModule: 'current',
      navModules: 'modules',
      menuCollapse: 'collapse',
      items: 'items'
    }),
    asideWidth() {
      return this.menuCollapse
        ? layout.asideCollapseWidth
        : layout.asideExpandWidth;
    },
    menuItems() {
      let items = this.items || [];
      if (this.navMode == 'nested') {
        items = items.filter(p => p.options.module == this.navModule);
      }
      return items;
    }
  },
  errorCaptured(err, vm, info) {
    console.log(typeof err);
    if (typeof err === 'BusinessError') {
      this.$notify({
        title: '请求失败',
        message: err.message || '处理发生错误',
        type: 'error'
      });

      return false;
    }
  }
};
</script>


<style scoped lang="less">
.layout {
  height: 100%;
  overflow: hidden;
  .header {
    padding: 0;
  }
  .sider {
    background: #fff;
    max-height: 100%;
    overflow: initial;
    overflow-y: auto;
    border-right: solid 1px #e6e6e6;
    /*.el-menu {
      height: 100%;
    }*/
    .el-scrollbar {
      height: 100%;
      /deep/ .el-scrollbar__wrap {
        // margin-right: 0 !important;
        overflow-x: hidden;
      }
    }
  }
  .main {
    // FOR EDGE
    overflow: hidden;
  }
  .content {
    padding: 0;
    .bread,
    .page {
      padding: 10px;
    }
    .page {
      flex: 1;
    }

    .el-scrollbar {
      height: 100%;
      widows: 100%;
      /deep/ .el-scrollbar__wrap {
        overflow-x: hidden;
        display: flex;
      }
      /deep/ .el-scrollbar__view {
        padding: 10px;
        display: flex;
        flex: 1;
        flex-direction: column;
        // overflow: auto;
      }
    }
  }
}
</style>
