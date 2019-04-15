<template>
  <div class="lite">
    <el-card class="list" size="mini" v-if="view == 'list'">
      <div slot="header">
        <span>参会企业列表</span>
        <el-button icon="el-icon-arrow-left" style="float: right; padding: 3px 0" type="text" @click="handleBack">返回</el-button>
      </div>
      <data-grid
        :data="items"
        :meta="fields"
        :operation="operation"
        :paging="true"
        :total="total"
        :filter="true"
        :action="true"
        @open="handleOpen"
        @query="handleQuery"
        @edit="handleEdit"
      >
        <template slot="action">
          <el-button icon="el-icon-edit" type="primary" size="mini" @click="handleNew">添加外部企业</el-button>
          <el-button icon="el-icon-download" type="primary" size="mini" @click="handleExport">导出企业列表</el-button>
        </template>
      </data-grid>
    </el-card>
    <el-card class="details" size="mini" v-else-if="view == 'review'">
      <div slot="header">
        <span>企业参会信息</span>
        <el-button icon="el-icon-arrow-left" style="float: right; padding: 3px 10px;" type="text" @click="view = 'list'">返回</el-button>
      </div>
      <data-review :data="current" @review="handleReview"> </data-review>
    </el-card>
    <el-card class="details" size="mini" v-else-if="view == 'form'">
      <div slot="header">
        <span>{{ isNew ? '添加企业信息' : '外部企业信息' }}</span>
        <el-button icon="el-icon-arrow-left" style="float: right; padding: 3px 10px;" type="text" @click="view = 'list'">返回</el-button>
      </div>
      <data-form :data="formData" :is-new="isNew" @save="handleSave" @cancel="view = 'list'" @save-item="handleSaveItem" @delete-item="handleDeleteItem">
      </data-form>
    </el-card>
  </div>
</template>
<script>
import DataReview from '@/components/jobs/fair-corp-review';
import DataForm from '@/components/jobs/fair-corp-form';
import DataGrid from '@naf/data/filter-grid';
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions } = createNamespacedHelpers('jobs/jobfair/corp');

export default {
  components: {
    DataReview,
    DataGrid,
    DataForm,
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
      /* 操作类型 */
      operation: [['open', '查看']],
      isNew: false,
    };
  },
  mounted() {
    this.handleQuery();
  },
  methods: {
    ...mapActions(['query', 'review', 'fetch', 'create', 'update', 'jobAdd', 'jobDelete', 'jobUpdate']),
    async handleOpen(data) {
      const res = await this.fetch({ id: data.id });
      if (!this.$checkRes(res)) {
        return;
      }
      const { external } = res.data;
      if (external === 1) {
        this.isNew = false;
        this.view = 'form';
      } else {
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
    handleExport() {
      // this.$message({
      //   type: 'info',
      //   message: '功能还未实现',
      // });
      const { fair_id } = this.$route.params;
      window.open(`/platform/api/jobs/jobfair/corp/export?fair_id=${fair_id}`, '_blank');
    },
    handleNew() {
      this.isNew = true;
      this.view = 'form';
    },
    async handleEdit({ id }) {
      const res = await this.fetch({ id });
      this.$checkRes(res, () => {
        this.isNew = false;
        this.view = 'form';
      });
    },
    async handleSave(payload) {
      const { fair_id } = this.$route.params;
      let res, msg;
      if (payload.isNew) {
        res = await this.create({ fair_id, ...payload });
        msg = '企业信息添加成功';
      } else {
        const { id } = payload.data;
        res = await this.update({ id, ...payload });
        msg = '企业信息修改成功';
      }
      if (this.$checkRes(res, msg)) {
        this.view = 'list';
      }
    },
    async handleSaveItem({ isNew, data }) {
      console.log('save-item:', data);
      let msg, promise;
      if (isNew) {
        promise = this.jobAdd(data);
        msg = '职位信息添加成功';
      } else {
        promise = this.jobUpdate(data);
        msg = '职位信息修改成功';
      }
      const res = await promise;
      this.$checkRes(res, msg);
    },
    async handleDeleteItem(data) {
      console.log('delete-item:', data);
      const res = await this.jobDelete(data);
      this.$checkRes(res, '删除职位信息成功');
    },
  },
  computed: {
    ...mapState(['items', 'current', 'total']),
    formData() {
      return this.isNew ? { jobs: [], unit: this.unit } : this.current;
    },
  },
};
</script>
<style lang="less" scoped>
@import '~@lib/style/lite.less';
</style>
