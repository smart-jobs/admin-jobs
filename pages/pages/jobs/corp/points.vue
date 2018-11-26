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
      fields: ['企业名称', '统一社会信用代码', '注册时间', '企业状态', '当前积分'],
      filters: ['企业名称'],
    };
  },
};
</script>

