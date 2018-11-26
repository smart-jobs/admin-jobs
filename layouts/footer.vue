<!--登录页面布局，只有footer-->
<template>
  <div style="height:100%;overflow:auto;">
    <transition name="form-fade" mode="in-out">
      <nuxt />
    </transition>
    <el-footer class="footer" height="layout.footerHeight">
      <naf-footer></naf-footer>
    </el-footer>
  </div>
</template>
<script>
import NafFooter from '@naf/frame/footer';
import config from '@frame/config';

const { layout } = config;

export default {
  components: {
    NafFooter
  },
  data() {
    return {
      layout
    };
  }
};
</script>

<style lang="less" scoped>
@import '~@frame/style/theme';

.footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  text-align: center;
  height: 48px;
}

.copyright {
  color: @text-color-secondary;
  font-size: @font-size-base;
}

</style>
