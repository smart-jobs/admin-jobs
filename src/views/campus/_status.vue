<template>
  <div class="lite">
    <data-grid :data="items" :meta="fields" :operation="operation" :paging="true" :total="total" @open="handleOpen" @query="handleQuery" v-if="view == 'list'">
    </data-grid>
    <el-card class="details" size="mini" v-else-if="view == 'details'">
      <div slot="header">
        <span>校园宣讲会</span>
        <el-button icon="el-icon-arrow-left" style="float: right; padding: 3px 10px;" type="text" @click="view = 'list'">返回</el-button>
      </div>
      <data-info :data="current"> </data-info>
      <div v-if="status == '1'">
        <el-button type="primary" @click="handleReview('0')">审核通过</el-button>
        <el-button type="info" @click="handleReview('2')">审核拒绝</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import DataInfo from '@/components/jobs/talk-info';
import DataGrid from '@naf/data/filter-grid';
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions } = createNamespacedHelpers('jobs/campus');

const CampusTalkStatus = {
  NORMAL: '0', // 正常，审核通过
  PENDING: '1', // 待审核
  REJECT: '2', // 审核失败
};

export default {
  components: {
    DataInfo,
    DataGrid,
  },
  data() {
    return {
      view: 'list',
      fields: [
        { name: 'subject', label: '主题' },
        { name: 'corp.name', label: '企业名称' },
        { name: 'status', label: '状态' },
        { name: 'school', label: '宣讲学校' },
        { name: 'city.name', label: '宣讲城市' },
        { name: 'address', label: '宣讲地址' },
        { name: 'time', label: '宣讲时间' },
        { name: 'meta.createdAt', label: '创建时间' },
      ],
      operation: [['open', '查看'], ['edit', '编辑']] /* 操作类型 */,
    };
  },
  validate({ params }) {
    // Must be a number
    return /^[0-2]$/.test(params.status);
  },
  created() {
    this.handleQuery();
  },
  watch: {
    // call again the method if the route changes
    status: 'handleQuery',
  },
  methods: {
    ...mapActions(['query', 'review', 'fetch']),
    async handleOpen(data) {
      const res = await this.fetch({ id: data._id });
      if (this.$checkRes(res)) {
        this.view = 'details';
      }
    },
    async handleReview(status) {
      const res = await this.review({ status, id: this.current._id });
      if (this.$checkRes(res, '审核操作成功')) {
        this.view = 'list';
      }
    },
    handleQuery({ filter, paging } = {}) {
      this.query({ status: this.status, paging });
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
