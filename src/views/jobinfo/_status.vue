<template>
  <div class="lite">
    <el-card class="right list" size="mini" v-if="view == 'list'">
      <div slot="header">
        <span>招聘信息列表</span>
        <el-button icon="el-icon-plus" style="float: right; padding: 3px 0" type="text" @click="handleNew" v-if="status == 'ext'">发布招聘信息</el-button>
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
        <span>招聘信息</span>
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
        <span>{{ form.isNew ? '发布招聘信息' : '修改招聘信息' }}</span>
        <el-button icon="el-icon-arrow-left" style="float: right; padding: 3px 10px;" type="text" @click="view = 'list'">返回</el-button>
      </div>
      <data-form :data="form.data" :is-new="form.isNew" @save="handleSave" @cancel="view = 'list'"> </data-form>
    </el-card>
  </div>
</template>
<script>
import moment from 'moment';
import DataInfo from '@/components/jobs/job-info';
import DataForm from '@/components/jobs/job-form';
import DataGrid from '@naf/data/filter-grid';
import { createNamespacedHelpers, mapGetters } from 'vuex';

const { mapState, mapActions } = createNamespacedHelpers('jobs/jobinfo');

const JobinfoStatus = {
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
        { name: 'title', label: '标题' },
        { name: 'corpname', label: '企业名称', filter: true },
        { name: 'status', label: '状态' },
        { name: 'city.name', label: '所在城市' },
        { name: 'meta.createdAt', label: '创建时间' },
      ],
      /* 操作类型 */
      operation: [['open', '查看/审核', 'el-icon-view'], ['edit', '编辑', 'el-icon-edit']],
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
    ...mapActions(['query', 'review', 'fetch', 'create', 'update']),
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
      if (this.status !== 'ext') {
        this.query({ ...filter, status: this.status, external: 0, paging });
      } else {
        this.query({ ...filter, external: 1, paging });
      }
    },
    handleNew() {
      const expired = moment()
        .add(15, 'days')
        .format('YYYY-MM-DD');
      const date = moment().format('YYYY-MM-DD');
      this.form = { data: { date, expired, unit: this.unit }, isNew: true };
      this.view = 'form';
    },
    async handleEdit({ id }) {
      const res = await this.fetch({ id });
      this.$checkRes(res, () => {
        this.form = { data: { ...res.data }, isNew: false };
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
  },
  computed: {
    ...mapState(['items', 'current', 'total']),
    ...mapGetters(['unit']),
    status() {
      return this.$route.params.status;
    },
  },
};
</script>
<style lang="less" scoped>
@import '~@lib/style/lite.less';
</style>
