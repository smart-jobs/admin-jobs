<template>
  <div>
    <el-table :data="data" @current-change="handleReset" style="width: 100%">
      <el-table-column prop="name" label="职位名称" width="200"> </el-table-column>
      <el-table-column prop="count" label="招聘数量" width="180"> </el-table-column>
      <el-table-column prop="requirement" label="需求专业" min-width="200"> </el-table-column>
    </el-table>
    <el-form ref="form" :model="form" :rules="rules" size="mini" label-width="100px">
      <el-form-item label="职位名称" prop="name" :required="true">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="招聘数量" prop="count" :required="true">
        <el-input placeholder="请输入招聘数量说明" v-model="form.count"> </el-input>
      </el-form-item>
      <el-form-item label="专业要求" prop="requirement" :required="true">
        <el-input type="textarea" :rows="2" placeholder="请输入需求专业描述" v-model="form.requirement"> </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSave" size="mini">{{ isNew ? '添加' : '保存' }}</el-button>
        <el-button type="danger" @click="handleDelete" size="mini" v-if="!isNew">删除</el-button>
        <el-button @click="handleReset()" size="mini">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import _ from 'lodash';
import CodeSelect from '@naf/data/code-select';

const requiredAndMaxlen = (name, len = 0) => {
  const rules = [{ required: true, message: `${name}不能为空`, trigger: 'blur' }];
  if (len > 0) rules.push({ max: len, message: `长度不能大于${len}个字符`, trigger: 'blur' });
  return rules;
};

export default {
  name: 'job-list',
  props: {
    data: { type: Array, required: true },
  },
  data() {
    return {
      form: {},
      isNew: true,
      rules: {
        name: requiredAndMaxlen('职位名称', 100),
        count: requiredAndMaxlen('招聘数量', 20),
        requirement: requiredAndMaxlen('需求专业', 200),
      },
    };
  },
  methods: {
    handleSave() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$emit('save-item', { isNew: this.isNew, data: this.form });
        } else {
          console.warn('form validate error!!!');
        }
      });
    },
    handleDelete() {
      if (this.form._id) {
        this.$emit('delete-item', this.form);
        this.handleReset();
      }
    },
    handleReset(val) {
      this.form = _.cloneDeep(val) || {};
      this.isNew = val === undefined;
      this.$refs['form'].resetFields();
    },
  },
};
</script>
<style lang="less" scoped>
.el-form {
  margin-top: 20px;
}
.el-form-item {
  width: 700px;
}
</style>
