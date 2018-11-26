<template>
  <el-tabs v-model="activeName" style="min-height: 400px">
    <el-tab-pane label="企业信息" name="first">
      <el-form label-width="100px">
        <el-form-item label="企业名称">
          {{data.corpname}}
        </el-form-item>
        <el-form-item label="企业描述">
          {{data.description}}
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="基本情况" name="second">
      <el-form label-width="100px">
        <el-form-item v-for="(item,index) in infoFields" :key="'info-field-'+index" :label="item.label" :prop="item.name">
          {{ getFieldValue(item.name) }}
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="联系方式" name="third">
      <el-form label-width="100px">
        <el-form-item v-for="(item,index) in contactFields" :key="'contact-field-'+index" :label="item.label" :prop="item.name">
          {{ getFieldValue(item.name) }}
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import _ from 'lodash';

export default {
  name: 'corp-info',
  props: {
    data: { type: Object, required: true },
  },
  data() {
    return {
      activeName: 'first',
      infoFields: [
        { name: 'info.city.name', label: '所在城市' },
        { name: 'info.scale.name', label: '企业规模' },
        { name: 'info.nature.name', label: '企业性质' },
        { name: 'info.industry.name', label: '所属行业' },
        { name: 'info.legalPerson', label: '法人代表' },
        { name: 'info.registerTime', label: '注册时间' },
        { name: 'info.registerMoney', label: '注册资金' },
      ],
      contactFields: [
        { name: 'contact.person', label: '联系人' },
        { name: 'contact.mobile', label: '联系人手机' },
        { name: 'contact.phone', label: '固定电话' },
        { name: 'contact.email', label: '电子邮件' },
        { name: 'contact.url', label: '网址' },
        { name: 'contact.postcode', label: '邮编' },
        { name: 'contact.address', label: '地址' },
      ],
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
