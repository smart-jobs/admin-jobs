<template>
  <el-tabs v-model="activeName" style="min-height: 400px">
    <el-tab-pane label="基本信息" name="first">
      <el-form ref="form" :model="form" :rules="rules" size="mini" label-width="120px">
        <slot>
          <el-form-item label="主题" prop="subject">
            <el-input v-model="form.subject"></el-input>
          </el-form-item>
          <el-form-item label="企业名称" prop="corpname">
            <el-input v-model="form.corpname" :disabled="!isNew && form.external != 1"> </el-input>
          </el-form-item>
          <!-- <el-form-item label="宣讲学校" prop="city">
        <code-select category="unit" v-model="form.unit" disabled> </code-select>
      </el-form-item> -->
          <el-form-item label="宣讲日期" prop="date">
            <el-date-picker v-model="form.date" type="date" value-format="yyyy-MM-dd" placeholder="请选择日期"> </el-date-picker>
          </el-form-item>
          <el-form-item label="宣讲时间" prop="time">
            <el-input v-model="form.time" placeholder="请输入时间描述"></el-input>
          </el-form-item>
          <el-form-item label="宣讲地址" prop="address">
            <el-input v-model="form.address" placeholder="请输入地址描述"></el-input>
          </el-form-item>
          <el-form-item label="招聘联系电话" prop="contact">
            <el-input v-model="form.contact" placeholder="请输入联系电话"></el-input>
          </el-form-item>
          <el-form-item label="简历投递邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请输入电子邮箱"></el-input>
          </el-form-item>
          <el-form-item label="宣讲会详情" prop="content">
            <el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="form.content"> </el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="$emit('cancel')" size="mini">取 消</el-button>
            <el-button type="primary" @click="handleSave" size="mini">{{ isNew ? '创建' : '保存' }}</el-button>
          </el-form-item>
        </slot>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="招聘职位" name="second" v-if="data.jobs && !isNew">
      <job-list :data="data.jobs" @save-item="$emit('save-item', $event)" @delete-item="$emit('delete-item', $event)"></job-list>
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
  name: 'talk-form',
  props: {
    data: { type: Object, required: true },
    isNew: { type: Boolean, default: false } /* 是否新创建 */,
  },
  data() {
    return {
      activeName: 'first',
      form: _.cloneDeep(this.data),
      rules: {
        subject: requiredAndMaxlen('主题', 100),
        corpname: requiredAndMaxlen('企业名称', 100),
        address: requiredAndMaxlen('宣讲地址', 100),
        date: requiredAndMaxlen('宣讲日期', 40),
        time: requiredAndMaxlen('宣讲时间', 40),
        contact: requiredAndMaxlen('招聘联系电话', 64),
        email: requiredAndMaxlen('简历投递邮箱', 64),
        content: requiredAndMaxlen('宣讲会详情', 10240),
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
</style>
