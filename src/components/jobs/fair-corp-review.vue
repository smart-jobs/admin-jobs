<template>
  <el-form ref="form" :model="form" :rules="rules" size="mini" label-width="120px">
    <slot>
      <el-form-item label="企业名称" prop="corpname">
        {{ data.corpname }}
        <el-button type="primary" icon="el-icon-search" size="medium" @click="onSearch">查询</el-button>
      </el-form-item>
      <el-form-item label="展位编号" prop="booth">
        <span v-if="readonly">{{ form.booth }}</span>
        <el-input v-model="form.booth" placeholder="请输入展位编号" v-else></el-input>
      </el-form-item>
      <el-form-item>
        <el-table :data="data.jobs" style="width: 100%">
          <el-table-column prop="name" label="职位名称" width="200"> </el-table-column>
          <el-table-column prop="count" label="招聘数量" width="180"> </el-table-column>
          <el-table-column prop="requirement" label="需求专业" min-width="200"> </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item v-if="!readonly">
        <el-button type="primary" @click="handleReview('0')">审核通过</el-button>
        <el-button type="info" @click="handleReview('2')">审核拒绝</el-button>
      </el-form-item>
    </slot>
  </el-form>
</template>
<script>
import _ from 'lodash';

const requiredAndMaxlen = (name, len = 0) => {
  const rules = [{ required: true, message: `${name}不能为空`, trigger: 'blur' }];
  if (len > 0) rules.push({ max: len, message: `长度不能大于${len}个字符`, trigger: 'blur' });
  return rules;
};

export default {
  name: 'fair-corp',
  props: {
    data: { type: Object, required: true },
    readonly: { type: Boolean, default: false },
  },
  data() {
    return {
      form: {
        booth: this.data.booth,
      },
      rules: {
        booth: requiredAndMaxlen('展位编号', 100),
      },
    };
  },
  methods: {
    handleReview(status) {
      if (status === '2') {
        this.$emit('review', { status });
        return;
      }
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$emit('review', { status, ...this.form });
        } else {
          console.warn('form validate error!!!');
        }
      });
    },
    onSearch() {
      if (this.data && this.data.corpname) {
        window.open(`https://www.tianyancha.com/search/${this.data.corpname}`);
      }
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
