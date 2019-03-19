<template>
  <el-form ref="form" :model="form" :rules="rules" size="mini" label-width="100px">
    <slot>
      <el-form-item label="主题" prop="subject" :required="true">
        <el-input v-model="form.subject"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type" :required="true">
        <el-select v-model="form.type" placeholder="请选择招聘会类型">
          <el-option label="校园招聘会" value="校园招聘会"> </el-option>
          <el-option label="网络招聘会" value="网络招聘会"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="举办城市" prop="city" :required="true">
        <code-select category="xzqh" v-model="form.city" mode="pair" placeholder="请选择举办城市"> </code-select>
      </el-form-item>
      <el-form-item label="举办地址" prop="address" :required="true">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="举办日期" prop="date" :required="true">
        <el-date-picker v-model="form.date" type="date" value-format="yyyy-MM-dd" placeholder="选择举办日期"> </el-date-picker>
      </el-form-item>
      <el-form-item label="举办时间" prop="time" :required="true">
        <el-input v-model="form.time" placeholder="请输入举办时间描述"></el-input>
      </el-form-item>
      <el-form-item label="招聘会详情" prop="content" :required="true">
        <wang-editor v-model="form.content" upload-img-server="/files/jobs/jobfair/upload"></wang-editor>
      </el-form-item>
      <el-form-item label="数量限制" prop="limit.count" v-if="form.type == '校园招聘会'">
        <el-input-number placeholder="外校学生申请普通门票数量" type="number" v-model="form.limit.count"> </el-input-number>
      </el-form-item>
      <el-form-item label="时间限制" prop="limit.time" v-if="form.type == '校园招聘会'">
        <el-time-select
          v-model="form.limit.time"
          :picker-options="{ start: '08:30', step: '00:10', end: '18:30' }"
          placeholder="受限门票入场时间"
        ></el-time-select>
      </el-form-item>
      <el-form-item label="验证密码" prop="secret" v-if="form.type == '校园招聘会'">
        <el-input v-model="form.secret" placeholder="请输入扫码设备验证密码" type="password"></el-input>
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
import { createNamespacedHelpers } from 'vuex';
import WangEditor from '@naf/data/wang-editor';
import CodeSelect from '@naf/data/code-select';

const requiredAndMaxlen = (name, len = 0) => {
  const rules = [{ required: true, message: `${name}不能为空`, trigger: 'blur' }];
  if (len > 0) rules.push({ max: len, message: `长度不能大于${len}个字符`, trigger: 'blur' });
  return rules;
};

export default {
  components: {
    WangEditor,
    CodeSelect,
  },
  name: 'draft-form',
  props: {
    data: { type: Object, required: true },
    isNew: { type: Boolean, default: false } /* 是否新创建 */,
  },
  data() {
    return {
      form: { limit: {}, ..._.cloneDeep(this.data) },
      rules: {
        subject: requiredAndMaxlen('主题', 100),
        type: requiredAndMaxlen('类型', 40),
        address: requiredAndMaxlen('举办地址', 100),
        date: requiredAndMaxlen('举办日期', 40),
        time: requiredAndMaxlen('举办时间', 80),
        content: requiredAndMaxlen('招聘会详情', 102400),
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
