<template>
  <div class="lite">
    <el-card class="right list" size="mini" v-if="view == 'list'">
      <div slot="header">
        <span>参会企业列表</span>
        <el-button icon="el-icon-arrow-left" style="float: right; padding: 3px 0" type="text" @click="handleBack">返回</el-button>
      </div>
      <data-grid :data="items" :meta="fields" :operation="operation" :paging="true" :total="total" :filter="true" @open="handleOpen" @query="handleQuery">
      </data-grid>
    </el-card>
    <el-card class="details" size="mini" v-else-if="view == 'review'">
      <div slot="header">
        <span>企业参会信息</span>
        <el-button icon="el-icon-arrow-left" style="float: right; padding: 3px 10px;" type="text" @click="view = 'list'">返回</el-button>
      </div>
      <data-info :data="current" @review="handleReview"> </data-info>
    </el-card>
  </div>
</template>
<script>
import DataInfo from '@/components/jobs/fair-corp';
import DataGrid from '@naf/data/filter-grid';
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions } = createNamespacedHelpers('jobs/jobfair/corp');

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
        { name: 'booth', label: '展位号' },
        { name: 'status', label: '审核状态', filter: true, formatter: this.statusLabel },
        { name: 'meta.createdAt', label: '申请时间', formatter: ['date', 'YYYY-MM-DD HH:mm'] },
        { name: 'checkin.status', label: '入场状态' },
        { name: 'checkin.time', label: '入场时间', formatter: ['date', 'YYYY-MM-DD HH:mm'] },
      ],
      operation: [['open', '查看']] /* 操作类型 */,
    };
  },
  mounted() {
    this.handleQuery();
  },
  methods: {
    ...mapActions(['query', 'review', 'fetch']),
    async handleOpen(data) {
      const res = await this.fetch({ id: data.id });
      if (this.$checkRes(res)) {
        this.view = 'review';
      }
    },
    async handleReview({ status, booth, remark }) {
      const res = await this.review({ status, booth, remark, id: this.current.id });
      if (this.$checkRes(res, '审核操作成功')) {
        this.view = 'list';
      }
    },
    // eslint-disable-next-line no-unused-vars
    handleQuery({ filter = {}, paging } = {}) {
      this.view = 'list';
      const { fair_id } = this.$route.params;
      this.query({ ...filter, fair_id, paging });
    },
    handleBack() {
      this.$router.back();
    },
    statusLabel: (row, column, cellValue, index) => {
      switch (cellValue) {
        case '0':
          return '通过(0)';
        case '1':
          return '待审核(1)';
        case '2':
          return '拒绝(2)';
        default:
          return cellValue;
      }
    },
  },
  computed: {
    ...mapState(['items', 'current', 'total']),
  },
};
</script>
<style lang="less" scoped>
@import '~@lib/style/lite.less';
</style>
