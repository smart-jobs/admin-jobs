<template>
  <el-tabs v-model="activeName" style="min-height: 400px">
    <el-tab-pane label="基本信息" name="first">
      <el-form label-width="100px">
        <el-form-item label="主题">
          {{data.subject}}
        </el-form-item>
        <el-form-item label="类型">
          {{ data.type }}
        </el-form-item>
        <el-form-item label="举办城市">
          {{ getFieldValue('city.name')}}
        </el-form-item>
        <el-form-item label="举办地址">
          {{ getFieldValue('address')}}
        </el-form-item>
        <el-form-item label="举办时间">
          {{ getFieldValue('time')}}
        </el-form-item>
        <el-form-item label="创建时间">
          {{getFieldValue('meta.createdAt')}}
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="招聘会详情" name="second">
      {{data.content}}
    </el-tab-pane>
    <el-tab-pane label="配置信息" name="third">
      <el-form v-model="data" label-width="150px">
        <el-form-item label="数量限制">
          {{getFieldValue('limit.count')}}
          <!-- <el-input-number placeholder="外校学生申请普通门票数量" type="number" v-model="limit.count"></el-input-number> -->
        </el-form-item>
        <el-form-item label="入场时间限制">
          {{getFieldValue('limit.time')}}
          <!-- <el-time-select v-model="limit.count" :picker-options="{ start: '08:30',step: '00:10',end: '18:30'}" 
            placeholder="受限门票入场时间"> -->
        </el-form-item>
        <el-form-item label="扫码设备验证密码">
          {{getFieldValue('secret')}}
          <!-- <el-input v-model="secret" placeholder="请输入密码" type="password"></el-input> -->
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import _ from 'lodash';

export default {
  name: 'fair-info',
  props: {
    data: { type: Object, required: true }
  },
  data() {
    return {
      activeName: 'first'
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
