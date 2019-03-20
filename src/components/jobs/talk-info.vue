<template>
  <el-tabs v-model="activeName" style="min-height: 400px">
    <el-tab-pane label="基本信息" name="first">
      <el-form label-width="120px">
        <el-form-item label="主题">
          {{ data.subject }}
        </el-form-item>
        <el-form-item label="企业名称">
          {{ getFieldValue('corpname') }}
        </el-form-item>
        <el-form-item label="宣讲时间">
          {{ getFieldValue('date') }}
          {{ getFieldValue('time') }}
        </el-form-item>
        <el-form-item label="宣讲地址">
          {{ getFieldValue('address') }}
        </el-form-item>
        <el-form-item label="招聘联系电话">
          {{ getFieldValue('contact') }}
        </el-form-item>
        <el-form-item label="简历投递邮箱">
          {{ getFieldValue('email') }}
        </el-form-item>
        <el-form-item label="审核状态">
          {{ data.status }}
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="招聘职位" name="second" v-if="data.jobs">
      <el-table :data="data.jobs" style="width: 100%">
        <el-table-column prop="name" label="职位名称" width="200"> </el-table-column>
        <el-table-column prop="count" label="招聘数量" width="180"> </el-table-column>
        <el-table-column prop="requirement" label="需求专业" min-width="200"> </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="信息详情" name="third">
      {{ data.content }}
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import _ from 'lodash';

export default {
  name: 'talk-info',
  props: {
    data: { type: Object, required: true },
  },
  data() {
    return {
      activeName: 'first',
    };
  },
  methods: {
    getFieldValue(path) {
      return _.get(this.data, path);
    },
  },
};
</script>
<style lang="less" scoped>
.el-form-item {
  margin-bottom: 0;
  /deep/ .el-form-item__content {
    padding-left: 20px;
  }
}
</style>
