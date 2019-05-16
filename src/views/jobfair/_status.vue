<template>
  <div class="lite">
    <el-card class="right list" size="mini" v-if="view == 'list'">
      <div slot="header">
        <span>招聘会列表</span>
        <el-button icon="el-icon-plus" style="float: right; padding: 3px 0" type="text" @click="handleNew" v-if="status == '0'">创建招聘会</el-button>
      </div>
      <data-grid
        :data="items"
        :meta="fields"
        :operation="operation"
        :paging="true"
        :total="total"
        @open="handleOpen"
        @query="handleQuery"
        @edit="handleEdit"
        @publish="handlePublish"
        @unpublish="handleUnpublish"
      >
        <template slot="ext">
          <el-table-column label="参会企业情况" prop="corp_count">
            <template slot-scope="{ row }">
              <span v-if="row.corp_count">
                <el-tooltip content="签到 / 审核 / 总数">
                  <router-link :to="{ name: 'jobfair_corp', params: { fair_id: row.id } }">
                    {{ row.corp_count.checked }} / {{ row.corp_count.approved }} / {{ row.corp_count.total }}
                  </router-link>
                </el-tooltip>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="入场券情况" prop="corp_count">
            <template slot-scope="{ row }">
              <span v-if="row.ticket_count">
                <el-tooltip content="入场 / 总数">
                  <router-link :to="{ name: 'jobfair_ticket', params: { fair_id: row.id } }">
                    {{ row.ticket_count.verified }} / {{ row.ticket_count.total }}
                  </router-link>
                </el-tooltip>
              </span>
            </template>
          </el-table-column>
        </template>
      </data-grid>
    </el-card>
    <el-card class="details" size="mini" v-else-if="view == 'details'">
      <div slot="header">
        <span>招聘会</span>
        <el-button icon="el-icon-arrow-left" style="float: right; padding: 3px 10px;" type="text" @click="view = 'list'">返回</el-button>
      </div>
      <data-info :data="current"> </data-info>
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
import { createNamespacedHelpers, mapGetters } from 'vuex';

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
        { name: 'address', label: '举办地址' },
        { name: 'date', label: '举办日期' },
      ],
      /* 操作类型 */
      oper0: [
        ['open', '查看', 'el-icon-view'],
        ['edit', '编辑', 'el-icon-edit'],
        ['publish', '发布', 'el-icon-share', '招聘会发布后，将不在接受企业参展申请，也不能修改招聘会信息。是否现在发布招聘会？'],
      ] /* 操作类型 */,
      oper1: [
        ['open', '查看', 'el-icon-view'],
        ['unpublish', '取消发布', 'el-icon-back', '取消发布后，可以修改招聘会信息，企业也可以提交参展申请。是否现在发布招聘会？'],
      ],
      oper2: [['open', '查看', 'el-icon-view']],
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
      this.form = { data: { type: '校园招聘会', unit: this.unit }, isNew: true };
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
    async handlePublish({ id }) {
      const res = await this.update({ id, data: { status: '1' } });
      this.$checkRes(res, '招聘会发布成功，将不再接受企业参会申请，也不能修改招聘会信息');
    },
    async handleUnpublish({ id }) {
      const res = await this.update({ id, data: { status: '0' } });
      this.$checkRes(res, '操作成功，现在可以接受企业参会申请，也可以修改招聘会信息');
    },
  },
  computed: {
    ...mapState(['items', 'current', 'total']),
    ...mapGetters(['unit', 'platform']),
    status() {
      return this.$route.params.status;
    },
    operation() {
      if (this.platform === 'master') return this.oper2;
      return this.status === '0' ? this.oper0 : this.oper1;
    },
  },
};
</script>
<style lang="less" scoped>
@import '~@lib/style/lite.less';
</style>
