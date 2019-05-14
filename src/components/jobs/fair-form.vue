<template>
  <el-form ref="form" :model="form" :rules="rules" size="mini" label-width="100px">
    <slot>
      <el-form-item label="主题" prop="subject">
        <el-input v-model="form.subject"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择招聘会类型">
          <el-option label="校园招聘会" value="校园招聘会"> </el-option>
          <el-option label="网络招聘会" value="网络招聘会" :disabled="true"> </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="举办单位" prop="city">
        <code-select category="unit" v-model="form.unit" disabled> </code-select>
      </el-form-item> -->
      <el-form-item label="举办城市" prop="city">
        <code-select category="city" v-model="form.city" mode="pair" placeholder="请选择城市"> </code-select>
      </el-form-item>
      <el-form-item label="举办地址" prop="address">
        <el-input v-model="form.address" placeholder="请输入地址描述"></el-input>
      </el-form-item>
      <el-form-item label="举办日期" prop="date">
        <el-date-picker v-model="form.date" type="date" value-format="yyyy-MM-dd" placeholder="请选择日期"> </el-date-picker>
      </el-form-item>
      <el-form-item label="举办时间" prop="time">
        <el-input v-model="form.time" placeholder="请输入时间描述"></el-input>
      </el-form-item>
      <el-form-item label="招聘会详情" prop="content">
        <wang-editor v-model="form.content" upload-img-server="/files/jobs/jobfair/upload"></wang-editor>
      </el-form-item>
      <el-form-item label="是否限制" prop="limit.count" v-if="form.type == '校园招聘会'">
        <el-switch v-model="limits"> </el-switch>
        <span class="desc">限制非本校学生申请普通入场券数量和入场时间。</span>
      </el-form-item>
      <el-form-item label="数量限制" prop="limit.count" v-if="form.type == '校园招聘会' && this.limits">
        <el-input-number placeholder="" type="number" v-model="form.limit.count" :min="0" v-if="limits"> </el-input-number>
        <span class="desc">非本校学生申请普通入场券数量限制，本校学生不限制。</span>
      </el-form-item>
      <el-form-item label="时间限制" prop="limit.time" v-if="form.type == '校园招聘会' && this.limits">
        <el-time-select v-model="form.limit.time" :picker-options="{ start: '08:30', step: '00:10', end: '18:30' }" placeholder="受限入场时间"></el-time-select>
        <span class="desc">受限入场券只能在规定之后入场，普通入场券无限制。</span>
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
  name: 'fair-form',
  props: {
    data: { type: Object, required: true },
    isNew: { type: Boolean, default: false } /* 是否新创建 */,
  },
  data() {
    return {
      form: { limit: { count: 0 }, ..._.cloneDeep(this.data) },
      limits: true,
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
          const limit = { ...this.form.limit };
          if (!this.limits) limit.count = -1;
          const data = { ...this.form, limit };
          this.$emit('save', { isNew: this.isNew, data });
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
