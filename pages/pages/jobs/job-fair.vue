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
      fields: ['招聘会名称', '招聘类别', '举行地点', '举行时间', '状态', '管理员', '更新时间'],
      filters: ['招聘会名称'],
    };
  },
};
</script>

