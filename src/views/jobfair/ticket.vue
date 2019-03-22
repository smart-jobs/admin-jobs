<template>
  <div class="lite">
    <el-card class="right list" size="mini" v-if="view == 'list'">
      <div slot="header">
        <span>入场券领取列表</span>
        <el-button icon="el-icon-arrow-left" style="float: right; padding: 3px 0" type="text" @click="handleBack">返回</el-button>
      </div>
      <data-grid :operation="operation" :data="items" :meta="fields" :paging="true" :total="total" :filter="true" @query="handleQuery"> </data-grid>
    </el-card>
  </div>
</template>
<script>
import DataGrid from '@naf/data/filter-grid';
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions } = createNamespacedHelpers('jobs/jobfair/ticket');

export default {
  components: {
    DataGrid,
  },
  data() {
    return {
      view: 'list',
      fields: [
        { name: 'user.name', label: '姓名', filter: true },
        { name: 'user.yxmc', label: '所在院校', filter: true },
        { name: 'type', label: '门票类型', formatter: this.typeLabel },
        { name: 'origin', label: '用户类型', formatter: this.originLabel },
        { name: 'verify.status', label: '使用状态', formatter: this.statusLabel },
        { name: 'meta.createdAt', label: '申请时间', formatter: ['date', 'YYYY-MM-DD HH:mm'] },
        { name: 'verify.time', label: '入场时间', formatter: ['date', 'YYYY-MM-DD HH:mm'] },
      ],
      operation: [],
    };
  },
  mounted() {
    this.handleQuery();
  },
  methods: {
    ...mapActions(['query']),
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
          return '未用(0)';
        case '1':
          return '已用(1)';
        default:
          return cellValue;
      }
    },
    typeLabel: (row, column, cellValue, index) => {
      switch (cellValue) {
        case '0':
          return '普通票(0)';
        case '1':
          return '受限票(1)';
        default:
          return cellValue;
      }
    },
    originLabel: (row, column, cellValue, index) => {
      switch (cellValue) {
        case '0':
          return '本校生(0)';
        case '1':
          return '外校生(1)';
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
