<template>
  <demo-table :fields="fields" :filters="filters"></demo-table>
</template>
<script>
import DemoTable from '@naf/data/demo-table';

export default {
  components: {
    DemoTable,
  },
  data() {
    return {
      fields: ['姓名', '用户标识', '所在企业', '手机号', '电子邮箱', '注册时间', '用户状态'],
      filters: ['姓名', '用户标识', '所在企业', '手机号'],
    };
  },
};
</script>

