<template>
  <div class="body">
    <nave-bar>
      <div slot="nav-left" class="nav-my-info">
        <van-icon name="wap-home-o" color="#fff" @click="goHome" size="30px" />
      </div>
      <div slot="nav-center" class="title">
        我的管家
      </div>
      <div slot="nav-right" class="nav-my-info"></div>
    </nave-bar>
    <header class="center-header">
      <img
        src="@/images/common/head-portrait.jpg"
        class="head-portrait"
        alt=""
      />
      <span class="account">小猪佩奇</span>
    </header>
    <section class="order-panel">
      <ul class="order-content">
        <li>
          <img src="@/images/home/order.svg" alt="" />
          <p>全部订单</p>
        </li>
        <li>
          <img src="@/images/home/payment.svg" alt="" />
          <p>待付款</p>
        </li>
        <li>
          <img src="@/images/home/no-trip.svg" alt="" />
          <p>未出行</p>
        </li>
      </ul>
    </section>
    <ul class="menu">
      <li>
        <a href="">我的钱包</a>
      </li>
      <li>
        <a href="">优惠券</a>
      </li>
      <li>
        <a href="">我的收藏</a>
      </li>
      <li>
        <a href="">我的资料</a>
      </li>
      <li>
        <a href="">密码管理</a>
      </li>
    </ul>
    <ul class="customer-service">
      <li>联系管家</li>
    </ul>
    <section class="logout">
      <van-button type="primary" color="#f70" size="large" @click="logOut"
        >退出登录</van-button
      >
    </section>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Icon, Button } from "vant";
import NaveBar from "@/common/components/navBar.vue";
import CustomerService from "@/services/customerService";
@Component({
  name: "PersonalCenter",
  components: {
    [Icon.name]: Icon,
    [Button.name]: Button,
    NaveBar
  }
})
class PersonalCenter extends Vue {
  created() {}

  logOut() {
    CustomerService.logOut().then(ret => {
     
      if(ret.status==200){
 console.log(ret)
      }
    });
  }
  goHome() {
    this.$router.push("/home");
  }
}
export default PersonalCenter;
</script>

<style lang="scss" scoped>
.body {
  background-color: #f0f0f0; /* 浏览器不支持的时候显示 */
  background-image: linear-gradient(#00c37d 28%, #f0f0f0 32%);
  height: 100vh;
  overflow: auto; //防止边距重叠
  .center-header {
    padding-top: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 10px;
    margin-top: 20px;
    .head-portrait {
      width: 40px;
      border-radius: 100%;
      margin-right: 6px;
      border: 2px #abe4bf solid;
    }
    .account {
      color: #fff;
      font-size: 15px;
    }
  }
  .order-panel,
  .menu,
  .customer-service {
    background: #fff;
    margin: 20px 15px 0 15px;
    border-radius: 5px;
    box-shadow: 5px 5px 10px #888888;
  }
  .order-panel {
    img {
      width: 30px;
    }
    .order-content {
      display: flex;
      justify-content: space-evenly;
      align-items: flex-end;
      padding: 10px 0;
      li {
        text-align: center;
        p {
          color: #a5a5a5;
          font-size: 13px;
          margin: 0;
        }
      }
    }
  }
  .menu {
    padding: 0 10px;
    li:not(last-child) {
      border-bottom: 1px solid #f6f6f8;
      font-size: 15px;
      line-height: 50px;
      a {
        color: #000;
      }
    }
  }
  .customer-service {
    padding: 0 10px;
    li {
      border-bottom: 1px solid #f6f6f8;
      font-size: 15px;
      line-height: 50px;
      a {
        color: #000;
      }
    }
  }
  .logout{
    margin: 20px 15px 10px 15px;
  }
}
.title {
  flex: 1;
  font-size: 16px;
  color: #fff;
}
.nav-title {
  background: #00c37d;
}
</style>
