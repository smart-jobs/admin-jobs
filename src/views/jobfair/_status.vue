<template>
  <div class="lite">
    <el-card class="right list" size="mini" v-if="view == 'list'">
      <div slot="header">
        <span>招聘会列表</span>
        <el-button icon="el-icon-plus" style="float: right; padding: 3px 0" type="text" @click="handleNew" v-if="status == '0'">创建招聘会</el-button>
      </div>
      <data-grid :data="items" :meta="fields" :operation="operation" :paging="true" :total="total" @open="handleOpen" @query="handleQuery"> </data-grid>
    </el-card>
    <el-card class="details" size="mini" v-else-if="view == 'details'">
      <div slot="header">
        <span>招聘会</span>
        <el-button icon="el-icon-arrow-left" style="float: right; padding: 3px 10px;" type="text" @click="view = 'list'">返回</el-button>
      </div>
      <data-info :data="current"> </data-info>
      <!-- <div v-if="status == '1'">
        <el-button type="primary" @click="handleReview('0')">审核通过</el-button>
        <el-button type="info" @click="handleReview('2')">审核拒绝</el-button>
      </div> -->
    </el-card>
    <el-card class="right details" size="mini" v-else-if="view == 'form'">
      <div slot="header">
        <span>{{ form.isNew ? '创建招聘会' : '修改招聘会' }}</span>
        <el-button icon="el-icon-arrow-left" style="float: right; padding: 3px 10px;" type="text" @click="view = 'list'">返回</el-button>
      </div>
      <data-form :data="form.data" :is-new="form.isNew" @save="handleSave" @cancel="view = 'list'"> </data-form>
    </el-card>
  </div>
</template>
<script>
import DataInfo from '@/components/jobs/fair-info';
import DataForm from '@/components/jobs/fair-form';
import DataGrid from '@naf/data/filter-grid';
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions } = createNamespacedHelpers('jobs/jobfair');

const JobfairStatus = {
  OPENING: '0', // 开放申请
  CLOSED: '1', // 已关闭
  IN_PROGRESS: '2', // 进行中
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
        { name: 'type', label: '类型' },
        { name: 'status', label: '状态' },
        { name: 'city.name', label: '举办城市' },
        { name: 'address', label: '举办地址' },
        { name: 'time', label: '举办时间' },
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
    ...mapActions(['query', 'fetch', 'create', 'update']),
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
      this.view = 'list';
      this.query({ status: this.status, paging });
    },
    handleNew() {
      this.form = { data: { type: '校园招聘会' }, isNew: true };
      this.view = 'form';
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
  },
  computed: {
    ...mapState(['items', 'current', 'total']),
    status() {
      return this.$route.params.status;
    },
  },
};
</script>
<style lang="less" scoped>
@import '~@lib/style/lite.less';
</style>
