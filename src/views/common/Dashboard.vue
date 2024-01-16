<template>
  <div class="dashboard">
    <div class="stats-container">
      <!-- 统计信息块 -->
	  
	  <div class="stats-item">
	    <p class="stats-title">下级会员</p>
	    <p class="stats-number">{{stats.user_count}}</p>
	  </div>
	  <div class="stats-item">
	    <p class="stats-title">下级充值总额</p>
	    <p class="stats-number">{{stats.user_recharge}}</p>
	  </div>
	  <div class="stats-item">
	    <p class="stats-title">下级提现总额</p>
	    <p class="stats-number">{{stats.user_withdra}}</p>
	  </div>
	  <div class="stats-item">
	    <p class="stats-title">总盈利</p>
	    <p class="stats-number">{{stats.user_yingli}}</p>
	  </div>
	  
	  <div class="stats-item">
	    <p class="stats-title">今日推广会员</p>
	    <p class="stats-number">{{stats.today_user}}</p>
	  </div>
	  <div class="stats-item">
	    <p class="stats-title">今日充值</p>
	    <p class="stats-number">{{stats.today_recharge}}</p>
	  </div>
	  <div class="stats-item">
	    <p class="stats-title">今日提现</p>
	    <p class="stats-number">{{stats.today_withdra}}</p>
	  </div>
	  <div class="stats-item">
	    <p class="stats-title">今日盈利</p>
	    <p class="stats-number">{{stats.today_yingli}}</p>
	  </div>
	  
    </div>
  </div>
</template>

<script>
// 导入API方法
import { getStats } from '../../api/user';

export default {
  name: 'Dashboard',
  data() {
    return {
      // 假设的统计数据
      stats: {
		  user_count: 0,
		  user_recharge: 0,
		  user_withdra: 0,
		  user_yingli: 0,
		  
		  today_user: 0,
		  today_recharge: 0,
		  today_withdra: 0,
		  today_yingli: 0,
	  }
    };
  },
  created() {
    // 这里调用API获取实际数据
    this.getData();
  },
  methods: {
    getData() {
      // API调用
      // getStats().then((res) => {
      //   // 假设的API响应处理
      //   this.stats = res.data;
      // });
    }
  }
};
</script>


<style lang="scss">
	//此页面为gpt生成 gpt牛逼
.dashboard {
  .stats-container {
	padding: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .stats-item {
      flex: 0 0 calc(20% - 10px); // 每个项目占据25%的宽度，减去间隙
      margin-bottom: 20px; // 底部间隙
      padding: 20px;
      background-color: #f7f7f7; // 背景颜色
      border-radius: 8px; // 圆角边框
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // 盒子阴影
      text-align: left; // 左对齐文本
      display: flex;
      flex-direction: column;
      justify-content: space-between; // 垂直方向上内容平均分布

      .stats-title {
        font-size: 1rem;
        color: #555;
        margin-bottom: 0.5rem;
      }

      .stats-number {
        font-size: 2.5rem; // 增大字体
        font-weight: bold;
        color: #333;
        margin-bottom: 0; // 重置间距
      }
    }
  }
}
</style>
