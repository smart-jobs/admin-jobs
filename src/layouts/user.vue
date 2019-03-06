<template>
  <!--简洁用户菜单-->
  <div class="right lite">
    <span class="name">{{ (userinfo && userinfo.name) || '管理員' }}</span>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    menuCollapse: Boolean,
  },
  methods: {
    ...mapActions({
      logout: 'login/logout',
    }),
    async handleLogout() {
      // console.log(this.userinfo);
      // console.log(this);
      const res = await this.logout();
      // console.log(res);
      // if (!res.errcode) {
      //   this.$router.push(this.$route.query.redirect || '/login');
      // }
    },
  },
  computed: {
    ...mapGetters(['userinfo']),
  },
};
</script>
<style lang="less" scoped>
.right.lite {
  font-size: 14px;
}
.el-button--text {
  color: white;
}
</style>
