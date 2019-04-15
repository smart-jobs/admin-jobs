<template>
  <el-form ref="form" :model="form" :rules="rules" size="mini" label-width="100px">
    <slot>
      <el-form-item label="招聘标题" prop="title" :required="true">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="招聘企业" prop="corpname">
        <el-input v-model="form.corpname" :disabled="!isNew && form.external != 1"> </el-input>
      </el-form-item>
      <el-form-item label="所在城市" prop="city">
        <code-select category="xzqh" v-model="form.city" mode="pair" placeholder="请选择城市"> </code-select>
      </el-form-item>
      <el-form-item label="需求人数" prop="count">
        <el-input placeholder="请输入需求人数" v-model="form.count"> </el-input>
      </el-form-item>
      <el-form-item label="职位描述" prop="jobdesc">
        <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="form.jobdesc"> </el-input>
      </el-form-item>
      <el-form-item label="职位类别：" prop="jobcat">
        <code-select category="zwlb" v-model="form.jobcat" mode="pair" placeholder="请选择："> </code-select>
      </el-form-item>
      <el-form-item label="工作性质" prop="nature">
        <code-select category="gzxz" v-model="form.nature" mode="pair" placeholder="请选择"> </code-select>
      </el-form-item>
      <el-form-item label="薪资待遇" prop="salary">
        <code-select category="xzdy" v-model="form.salary" mode="pair" placeholder="请选择"> </code-select>
      </el-form-item>
      <el-form-item label="学历要求" prop="xlreqs">
        <code-select category="xlcc" v-model="form.xlreqs" mode="pair" placeholder="请选择"> </code-select>
      </el-form-item>
      <el-form-item label="专业要求" prop="zyreqs">
        <el-input type="textarea" :rows="2" placeholder="请输入专业要求描述" v-model="form.zyreqs"> </el-input>
      </el-form-item>
      <!-- <el-form-item label="招聘学校" prop="city">
        <code-select category="unit" v-model="form.unit" disabled> </code-select>
      </el-form-item> -->
      <el-form-item label="失效日期" prop="expired" :required="true">
        <el-date-picker v-model="form.expired" type="date" value-format="yyyy-MM-dd" placeholder="请选择日期"> </el-date-picker>
      </el-form-item>
      <el-form-item label="招聘详情" prop="content" :required="true">
        <el-input type="textarea" :rows="8" placeholder="请输入招聘详情" v-model="form.content"> </el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="$emit('cancel')" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleSave" size="mini">{{ isNew ? '创建' : '保存' }}</el-button>
      </el-form-item>
    </slot>
  </el-form>
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
  components: {
    CodeSelect,
  },
  name: 'job-form',
  props: {
    data: { type: Object, required: true },
    isNew: { type: Boolean, default: false } /* 是否新创建 */,
  },
  data() {
    return {
      form: { limit: { count: 0 }, ..._.cloneDeep(this.data) },
      rules: {
        title: requiredAndMaxlen('招聘标题', 100),
        corpname: requiredAndMaxlen('招聘企业', 100),
        expired: requiredAndMaxlen('失效日期', 40),
        content: requiredAndMaxlen('招聘详情', 10240),
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
  },
};
</script>
<style lang="less" scoped>
.el-form-item {
  width: 700px;
}
.desc {
  color: gray;
  margin-left: 20px;
}
</style>
