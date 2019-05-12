<template>
  <el-tabs v-model="activeName" style="min-height: 400px">
    <el-tab-pane label="基本信息" name="first">
      <el-form ref="form" :model="form" :rules="rules" size="mini" label-width="120px">
        <slot>
          <el-form-item label="企业名称" prop="corpname">
            <el-input v-model="form.corpname"></el-input>
          </el-form-item>
          <el-form-item label="展位编号" prop="booth">
            <el-input v-model="form.booth" placeholder="请输入展位编号"></el-input>
          </el-form-item>
          <el-form-item label="企业详情" prop="description">
            <el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="form.description"> </el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="$emit('cancel')" size="mini">取 消</el-button>
            <el-button type="primary" @click="handleSave" size="mini">{{ isNew ? '创建' : '保存' }}</el-button>
          </el-form-item>
        </slot>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="招聘职位" name="second" v-if="data.jobs && !isNew">
      <job-list :data="data.jobs" @save-item="handleSaveItem" @delete-item="handleDeleteItem"></job-list>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import _ from 'lodash';
import JobList from './job-list';

const requiredAndMaxlen = (name, len = 0) => {
  const rules = [{ required: true, message: `${name}不能为空`, trigger: 'blur' }];
  if (len > 0) rules.push({ max: len, message: `长度不能大于${len}个字符`, trigger: 'blur' });
  return rules;
};

export default {
  components: {
    JobList,
  },
  name: 'fair-corp-form',
  props: {
    data: { type: Object, required: true },
    isNew: { type: Boolean, default: false } /* 是否新创建 */,
  },
  data() {
    return {
      activeName: 'first',
      form: _.cloneDeep(this.data),
      rules: {
        corpname: requiredAndMaxlen('企业名称', 100),
        booth: requiredAndMaxlen('展位编号', 100),
        description: requiredAndMaxlen('宣讲会详情', 10240),
      },
    };
  },
  methods: {
    handleSave() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$emit('save', { isNew: this.isNew, data: this.form });
        } else {
          console.warn('form validate error!!!');
        }
      });
    },
    handleSaveItem(payload) {
      this.$emit('save-item', payload);
    },
    handleDeleteItem(payload) {
      this.$emit('delete-item', payload);
    },
  },
};
</script>
<style lang="less" scoped>
.el-form-item {
  width: 700px;
}
</style>
