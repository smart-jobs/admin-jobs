<template>
  <div class="lite">
    <data-grid :data="items" :meta="fields" :operation="operation" :paging="true" :total="total" @open="handleOpen" @query="handleQuery" v-if="view == 'list'">
    </data-grid>
    <el-card class="details" size="mini" v-else-if="view == 'details'">
      <div slot="header">
        <span>企业用户信息</span>
        <el-button icon="el-icon-arrow-left" style="float: right; padding: 3px 10px;" type="text" @click="view = 'list'">返回</el-button>
      </div>
      <cord-info :data="current"> </cord-info>
    </el-card>
  </div>
</template>
<script>
import CordInfo from '@/components/jobs/cord-info';
import DataGrid from '@naf/data/filter-grid';
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions } = createNamespacedHelpers('jobs/corp');

export default {
  components: {
    CordInfo,
    DataGrid,
  },
  data() {
    return {
      view: 'list',
      fields: [
        { name: 'corpname', label: '企业名称' },
        { name: 'info.city.name', label: '所在城市' },
        { name: 'info.scale.name', label: '企业规模' },
        { name: 'info.nature.name', label: '企业性质' },
        { name: 'info.industry.name', label: '所属行业' },
        { name: 'contact.person', label: '联系人' },
        { name: 'contact.mobile', label: '联系人电话' },
        { name: 'contact.email', label: '电子邮件' },
        { name: 'meta.createdAt', label: '创建时间' },
      ],
      operation: [['open', '查看']] /* 操作类型 */,
    };
  },
  created() {
    this.handleQuery();
  },
  methods: {
    ...mapActions(['queryInfo', 'fetchInfo']),
    async handleOpen(data) {
      const res = await this.fetchInfo({ id: data._id });
      if (this.$checkRes(res)) {
        this.view = 'details';
      }
    },
    handleQuery({ filter, paging } = {}) {
      this.view = 'list';
      this.queryInfo({ paging });
    },
  },
  computed: {
    ...mapState(['items', 'current', 'total']),
  },
};
</script>
<style lang="less" scoped></style>
