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
      fields: ['单位名称', '主题', '举办地点', '举办时间', '所在学校', '状态', '管理员', '更新时间'],
      filters: ['单位名称', '所在学校'],
    };
  },
};
</script>

