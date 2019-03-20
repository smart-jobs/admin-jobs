<template>
  <div class="lite">
    <data-grid
      :data="items"
      :meta="fields"
      :operation="operation"
      :paging="true"
      :total="total"
      :filter="true"
      @open="handleOpen"
      @query="handleQuery"
      v-if="view == 'list'"
    >
    </data-grid>
    <el-card class="details" size="mini" v-else-if="view == 'details'">
      <div slot="header">
        <span>企业注册信息</span>
        <el-button icon="el-icon-arrow-left" style="float: right; padding: 3px 10px;" type="text" @click="view = 'list'">返回</el-button>
      </div>
      <data-info :data="current"> </data-info>
      <div v-if="status == '2'">
        <el-button type="primary" @click="handleReview('0')">审核通过</el-button>
        <el-button type="info" @click="handleReview('3')">审核拒绝</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import DataInfo from '@/components/jobs/corp-info';
import DataGrid from '@naf/data/filter-grid';
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions } = createNamespacedHelpers('jobs/corp');

export default {
  components: {
    DataInfo,
    DataGrid,
  },
  data() {
    return {
      view: 'list',
      fields: [
        { name: 'corpname', label: '企业名称', filter: true },
        { name: 'status', label: '状态' },
        { name: 'info.city.name', label: '所在城市' },
        { name: 'info.scale.name', label: '企业规模' },
        { name: 'info.nature.name', label: '企业性质' },
        { name: 'info.industry.name', label: '所属行业' },
        { name: 'contact.person', label: '联系人' },
        { name: 'contact.mobile', label: '联系人电话' },
        { name: 'contact.email', label: '电子邮件' },
        { name: 'meta.createdAt', label: '创建时间', formatter: ['date', 'YYYY-MM-DD HH:mm'] },
      ],
      operation: [['open', '查看']] /* 操作类型 */,
    };
  },
  validate({ params }) {
    // Must be a number
    return /^[0-3]$/.test(params.status);
  },
  created() {
    this.handleQuery();
  },
  watch: {
    // call again the method if the route changes
    status: 'handleQuery',
  },
  methods: {
    ...mapActions(['queryReg', 'reviewReg', 'fetchReg']),
    async handleOpen(data) {
      const res = await this.fetchReg({ id: data.corpid });
      if (this.$checkRes(res)) {
        this.view = 'details';
      }
    },
    async handleReview(status) {
      const res = await this.reviewReg({ status, id: this.current.corpid });
      if (this.$checkRes(res, '审核操作成功')) {
        this.view = 'list';
      }
    },
    // eslint-disable-next-line no-unused-vars
    handleQuery({ filter = {}, paging } = {}) {
      this.view = 'list';
      this.queryReg({ ...filter, status: this.status, paging });
    },
  },
  computed: {
    ...mapState(['items', 'current', 'total']),
    status() {
      return this.$route.params.status;
    },
  },
};
</script>
<style lang="less" scoped></style>
