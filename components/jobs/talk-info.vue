<template>
  <el-tabs v-model="activeName" style="min-height: 400px">
    <el-tab-pane label="基本信息" name="first">
      <el-form label-width="100px">
        <el-form-item label="主题">
          {{data.subject}}
        </el-form-item>
        <el-form-item label="企业名称">
          {{ getFieldValue('corp.name')}}
        </el-form-item>
        <el-form-item label="宣讲城市">
          {{ getFieldValue('city.name')}}
        </el-form-item>
        <el-form-item label="宣讲学校">
          {{ getFieldValue('school')}}
        </el-form-item>
        <el-form-item label="宣讲时间">
          {{getFieldValue('city.name')}}
        </el-form-item>
        <el-form-item label="宣讲地址">
          {{getFieldValue('address')}}
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
