<template>
  <div class="lite">
    <el-card class="right list" size="mini" v-if="view == 'list'">
      <div slot="header">
        <span>宣讲会列表</span>
        <el-button icon="el-icon-plus" style="float: right; padding: 3px 0" type="text" @click="handleNew" v-if="status == 'ext'">发布宣讲会</el-button>
      </div>
      <data-grid
        :data="items"
        :meta="fields"
        :operation="operation"
        :paging="true"
        :total="total"
        :filter="true"
        @open="handleOpen"
        @query="handleQuery"
        @edit="handleEdit"
      >
      </data-grid>
    </el-card>
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
    <el-card class="right details" size="mini" v-else-if="view == 'form'">
      <div slot="header">
        <span>{{ isNew ? '发布宣讲会' : '修改宣讲会' }}</span>
        <el-button icon="el-icon-arrow-left" style="float: right; padding: 3px 10px;" type="text" @click="view = 'list'">返回</el-button>
      </div>
      <data-form :data="formData" :is-new="isNew" @save="handleSave" @cancel="view = 'list'" @save-item="handleSaveItem" @delete-item="handleDeleteItem">
      </data-form>
    </el-card>
  </div>
</template>
<script>
import DataInfo from '@/components/jobs/talk-info';
import DataForm from '@/components/jobs/talk-form';
import DataGrid from '@naf/data/filter-grid';
import { createNamespacedHelpers, mapGetters } from 'vuex';

const { mapState, mapActions } = createNamespacedHelpers('jobs/campus');

const CampusTalkStatus = {
  NORMAL: '0', // 正常，审核通过
  PENDING: '1', // 待审核
  REJECT: '2', // 审核失败
};

export default {
  components: {
    DataInfo,
    DataForm,
    DataGrid,
  },
  data() {
    return {
      view: 'list',
      fields: [
        { name: 'subject', label: '主题' },
        { name: 'corpname', label: '企业名称', filter: true },
        { name: 'status', label: '状态' },
        { name: 'address', label: '宣讲地址' },
        { name: 'time', label: '宣讲时间' },
        { name: 'meta.createdAt', label: '创建时间' },
      ],
      /* 操作类型 */
      operation: [['open', '查看/审核', 'el-icon-view'], ['edit', '编辑', 'el-icon-edit']],
      isNew: false,
    };
  },
  validate({ params }) {
    // Must be a number
    return params.status === 'ext' || /^[0-2]$/.test(params.status);
  },
  created() {
    this.handleQuery();
  },
  watch: {
    // call again the method if the route changes
    status: 'handleQuery',
  },
  methods: {
    ...mapActions(['query', 'review', 'fetch', 'create', 'update', 'jobAdd', 'jobDelete', 'jobUpdate']),
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
    handleQuery({ filter = {}, paging } = {}) {
      this.view = 'list';
      if (this.status !== 'ext') {
        this.query({ ...filter, status: this.status, external: 0, paging });
      } else {
        this.query({ ...filter, external: 1, paging });
      }
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
      let res, msg;
      if (payload.isNew) {
        res = await this.create(payload);
        msg = '信息添加成功';
      } else {
        const { id } = payload.data;
        res = await this.update({ id, ...payload });
        msg = '信息修改成功';
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
    ...mapGetters(['unit']),
    status() {
      return this.$route.params.status;
    },
    formData() {
      return this.isNew ? { jobs: [], unit: this.unit } : this.current;
    },
  },
};
</script>
<style lang="less" scoped>
@import '~@lib/style/lite.less';
</style>
