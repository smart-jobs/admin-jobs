<template>
  <div class="logo" :style="{ width: width }">
    <router-link to="/">
      <img src="@/assets/logo1.svg" alt="logo" style="height:32px;width:32px;" />
    </router-link>
    <h1>{{ shortName }}</h1>
  </div>
</template>
<script>
export default {
  props: {
    shortName: String,
    width: {
      type: String,
      default: '256px',
    },
  },
};
</script>
<style lang="less" scoped>
.logo {
  display: table;
  box-sizing: border-box;
  border-right: solid 1px #e6e6e6;
  padding: 0 16px;
  overflow: hidden;
  img,
  h1 {
    vertical-align: middle;
  }
  h1 {
    display: inline-block;
    margin: 0 0 0 12px;
    font-size: 1.3em;
  }

  .el-switch {
    vertical-align: middle;
    text-align: right;
    display: table-cell;
  }
}
</style>
