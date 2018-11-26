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
      fields: ['单位名称', '主题', '招聘人数', '招聘截止时间', '发布时间', '发布人', '更新时间'],
      filters: ['单位名称', '主题'],
    };
  },
};
</script>

