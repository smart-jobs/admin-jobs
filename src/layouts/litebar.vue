<template>
  <div class="banner">
    <i class="naf-icons" :class="{ 'naf-icon-unfold': menuCollapse, 'naf-icon-fold': !menuCollapse }" @click="toggleMenu"></i>
    <naf-user class="right" />
  </div>
</template>
<script>
import NafUser from './user';

export default {
  components: {
    NafUser,
  },
  props: {
    menuCollapse: Boolean,
  },
  methods: {
    toggleMenu() {
      this.$emit('toggle-menu');
    },
  },
};
</script>
<style lang="less" scoped>
.banner {
  flex: 1;
  display: block;
  align-items: center;
  padding: 0 20px;
  .right {
    float: right;
  }
}
</style>
