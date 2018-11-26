<template>
    <div>
		<section class="data_section">
			<header class="section_title">数据统计</header>
			<el-row :gutter="20" style="margin-bottom: 10px;">
        <el-col :span="4"><div class="data_list today_head"><span class="data_num head">当日数据：</span></div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">{{userCount}}</span> 新增用户</div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">{{orderCount}}</span> 新增信息</div></el-col>
        <el-col :span="4"><div class="data_list"><span class="data_num">{{adminCount}}</span> 新增管理员</div></el-col>
			</el-row>
      <el-row :gutter="20">
        <el-col :span="4"><div class="data_list all_head"><span class="data_num head">总数据：</span></div></el-col>
        <el-col :span="4"><div class="data_list"><span class="data_num">{{allUserCount}}</span> 注册用户</div></el-col>
        <el-col :span="4"><div class="data_list"><span class="data_num">{{allOrderCount}}</span> 招聘信息</div></el-col>
        <el-col :span="4"><div class="data_list"><span class="data_num">{{allAdminCount}}</span> 管理员</div></el-col>
      </el-row>
		</section>
		<tendency :sevenDate='sevenDate' :sevenDay='sevenDay'></tendency>
    </div>
</template>

<script>
import tendency from '@naf/chart/tendency';
import moment from 'moment';

export default {
  head: {
    title: '首页'
  },
  data() {
    return {
      userCount: Math.floor(Math.random() * 100),
      orderCount: Math.floor(Math.random() * 100),
      adminCount: Math.floor(Math.random() * 10),
      allUserCount: Math.floor((Math.random() * 1000) + 100),
      allOrderCount: Math.floor((Math.random() * 1000) + 100),
      allAdminCount: Math.floor((Math.random() * 1000) + 10),
      sevenDay: [],
      sevenDate: [[], [], []],
    };
  },
  components: {
    tendency,
  },
  mounted() {
    for (let i = 6; i > -1; i -= 1) {
      const date = moment(new Date().getTime() - (86400000 * i)).format('YYYY-MM-DD');
      this.sevenDay.push(date);
    }
    this.getSevenData();
  },
  computed: {},
  methods: {
    async getSevenData() {
      const apiArr = [[], [], []];
      this.sevenDay.forEach(() => {
        apiArr[0].push(Math.floor(Math.random() * 100));
        apiArr[1].push(Math.floor(Math.random() * 100));
        apiArr[2].push(Math.floor(Math.random() * 100));
      });
      const promiseArr = [...apiArr[0], ...apiArr[1], ...apiArr[2]];
      Promise.all(promiseArr)
        .then((res) => {
          const resArr = [[], [], []];
          res.forEach((item, index) => {
            resArr[Math.floor(index / 7)].push(item);
          });
          this.sevenDate = resArr;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less">
@import "~@/style/mixin";

.data_section {
  padding: 20px;
  margin-bottom: 40px;
  .section_title {
    text-align: center;
    font-size: 30px;
    margin-bottom: 10px;
  }
  .data_list {
    text-align: center;
    font-size: 14px;
    color: #666;
    border-radius: 6px;
    background: #e5e9f2;
    .data_num {
      color: #333;
      font-size: 26px;
    }
    .head {
      border-radius: 6px;
      font-size: 22px;
      padding: 4px 0;
      color: #fff;
      display: inline-block;
    }
  }
  .today_head {
    background: #ff9800;
  }
  .all_head {
    background: #20a0ff;
  }
}
.wan {
  .sc(16px, #333);
}
</style>
