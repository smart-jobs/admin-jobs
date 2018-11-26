<template>
  <el-tabs v-model="activeName" style="min-height: 400px">
    <el-tab-pane label="基本信息" name="first">
      <el-form label-width="100px">
        <el-form-item label="招聘标题">
          {{data.title}}
        </el-form-item>
        <el-form-item label="招聘企业">
          {{ getFieldValue('corp.name')}}
        </el-form-item>
        <el-form-item label="所在城市">
          {{ getFieldValue('city.name')}}
        </el-form-item>
        <el-form-item label="创建时间">
          {{getFieldValue('meta.createdAt')}}
        </el-form-item>
        <el-form-item label="发布日期" v-if="data.status == '0'">
          {{data.date}}
        </el-form-item>
        <el-form-item label="审核状态">
          {{data.status}}
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="信息详情" name="second">
      {{data.content}}
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import _ from 'lodash';

export default {
  name: 'job-info',
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
    }
  }
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
