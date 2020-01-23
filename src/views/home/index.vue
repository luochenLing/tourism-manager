<template>
  <div id="app" class="layout">
    <nave-bar>
      <img slot="nav-left" src="/images/logo.png" alt class="logo" />
      <div slot="nav-left" class="address">杭州</div>
      <div slot="nav-center" @click="getSearch" class="nav-search">
        搜索关键字
      </div>
      <div slot="nav-right" class="nav-my-info">
        <router-link to="/login">我的</router-link>
      </div>
    </nave-bar>
    <vue-element-loading
      :active="loading"
      background-color="#f0f0f0"
      :is-full-screen="true"
    >
      <img src="@/images/common/loading.gif" alt="" v-if="loading" />
    </vue-element-loading>
    <van-swipe :autoplay="3000" indicator-color="white" class="index-swiper">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image.content" />
      </van-swipe-item>
    </van-swipe>
    <div class="projects">
      <div class="pro hotel">
        <div class="pro-left">
          <label>酒店</label>
          <img src="/images/home/hotel.png" alt class="src" />
        </div>
        <div class="pro-center">
          <div>国际酒店</div>
          <div>客栈</div>
        </div>
        <div class="pro-right">
          <div>民宿</div>
          <div>特惠酒店</div>
        </div>
      </div>
      <div class="pro ticket">
        <div class="pro-left">
          <label>机票</label>
          <img src="/images/home/ticket.png" alt class="src" />
        </div>
        <div class="pro-center">
          <div>船票</div>
          <div>火车票</div>
        </div>
        <div class="pro-right">
          <div>特价票</div>
          <div>自驾·租车</div>
        </div>
      </div>
      <div class="pro tour">
        <router-link to="/travel" class="pro-left">
          <label>旅游</label>
          <img src="/images/home/tour.png" alt class="src" />
        </router-link>
        <div class="pro-center">
          <div>景点·门票</div>
          <div>跟团</div>
        </div>
        <div class="pro-right">
          <div>自由行</div>
          <div>周边·短途</div>
        </div>
      </div>
    </div>
    <ul class="quick-entry">
      <li>
        <a href="#">
          <img src="/images/home/wifi.png" alt="" />
          <span>目的地大全</span>
        </a>
      </li>
      <li>
        <a href="#">
          <img src="/images/home/wedding-photography.png" alt="" />
          <span>婚纱旅拍</span>
        </a>
      </li>
      <li>
        <a href="#">
          <img src="/images/home/theme.png" alt="" />
          <span>主题游</span>
        </a>
      </li>
      <li>
        <a href="#">
          <img src="/images/home/purpose.png" alt="" />
          <span>目的地参团</span>
        </a>
      </li>
      <li>
        <a href="#">
          <img src="/images/home/honeymoon.png" alt="" />
          <span>蜜月游</span>
        </a>
      </li>
      <li>
        <a href="#">
          <img src="/images/home/island.png" alt="" />
          <span>海岛游</span>
        </a>
      </li>
      <li>
        <a href="#">
          <img src="/images/home/season-hot.png" alt="" />
          <span>当季热玩</span>
        </a>
      </li>
      <li>
        <a href="#">
          <img src="/images/home/more.png" alt="" />
          <span>更多</span>
        </a>
      </li>
    </ul>
    <div class="pop-activities">
      <h3 class="pop-title">热门活动</h3>
      <nav class="pop-content">
        <a href="">
          <dl>
            <dt>自由购精选</dt>
            <dd>
              境内外限时抢购
            </dd>
          </dl>
          <!-- <span>全球自由购</span> -->
          <img src="/images/home/global-purchase.png" alt="" />
        </a>
        <a href="">
          <dl>
            <dt>千款优惠券</dt>
            <dd>
              走过路过不错过
            </dd>
          </dl>
          <img src="/images/home/coupon.png" alt="" />
        </a>
      </nav>
      <nav class="pop-sub-content">
        <a href="">
          <img src="/images/home/bank-specials.png" alt="" />
        </a>
        <a href="">
          <img src="/images/home/rush-to-buy.jpeg" alt="" />
        </a>
      </nav>
    </div>
    <div class="marvellous">
      <h3 class="marvellous-title">发现精彩</h3>
      <nav class="marvellous-content">
        <a href="">
          <img src="/images/home/companions.png" alt="" />
        </a>
        <a href="">
          <img src="/images/home/season-must-go.png" alt="" />
        </a>
        <a href="">
          <img src="/images/home/travel-quiz.png" alt="" />
        </a>
        <a href="">
          <img src="/images/home/travels.png" alt="" />
        </a>
      </nav>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Swipe, SwipeItem, Lazyload, Skeleton } from "vant";

var VueElementLoading = require("vue-element-loading");
import NaveBar from "@/common/components/navBar.vue";
import TourismService from "@/services/tourismService";
import ErrorPage from "@/common/components/error.vue";
import common from "@/utils/common";
Vue.use(Lazyload);
@Component({
  name: "Home",
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    NaveBar,
    VueElementLoading
  }
})
class home extends Vue {
  images: Array<any> = [];
  loading: boolean = true;
  created() {
    this.getSwpierList();
  }
  /**
   * 获取首页轮播图
   */
  getSwpierList(){
    TourismService.GetSwpierList()
      .then(ret => {
        if (ret.data) {
          this.images = ret.data.resultData;
          this.loading = false;
        }
      })
      .catch(err => {
        this.loading = false;
        let text = common.GetHttpCodeMsg(err);
        let url=`/error?showNav=true&text=${text}`
        this.$router.replace(url);
      });
  }
  getSearch() {
    this.$router.push("/searchPanel");
  }
}
export default home;
</script>

<style lang="scss" scoped>
a:hover {
  color: #551a8b;
}
.layout {
  background-color: #f5f5f5;
  text-align: center;
  .index-swiper {
    width: 100%;
    height: 180px;
    position: relative;
    overflow: hidden;
    /deep/ .van-swipe__track {
      position: absolute;
      top: 15%;
      .van-swipe-item {
        position: relative;
        top: -36%;
      }
      img {
        width: 100%;
        // height: 130px;
        padding-top: 50px;
      }
    }
  }
  .projects {
    background-color: #fff;
    display: flex;
    flex-flow: column;
    padding: 5px;
    font-size: 16px;
    color: #fff;
    font-weight: 530;
    border-radius: 20px;
    overflow: hidden;
    .pro {
      height: 90px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      .pro-left {
        display: flex;
        flex-flow: column;
        height: inherit;
        justify-content: center;
        border-right: 1px solid #fff;
        img {
          width: 110px;
          height: 60px;
        }
        label {
          left: 0;
          top: 0;
          color: #fff;
        }
      }
      .pro-center {
        border-right: 1px solid #fff;
      }
      .pro-center,
      .pro-right {
        display: flex;
        flex-flow: column;
        height: inherit;
        justify-content: center;
        flex: 1;
        img {
          width: 110px;
          height: 60px;
        }
        label {
          left: 0;
          top: 0;
          color: #fff;
        }
        div {
          flex: 1;
          line-height: 45px;
          &:nth-child(1) {
            border-bottom: 1px solid #fff;
          }
        }
      }
    }
    .hotel {
      background-color: #fa5c55;
      background-image: linear-gradient(to right, #fa5c55, #fa7252);
    }
    .ticket {
      background-color: #4b90ed;
      background-image: linear-gradient(to right, #4b90ed, #4e9ded);
    }
    .tour {
      background-color: #35c3a9;
      background-image: linear-gradient(to right, #35c3a9, #44c791);
    }
  }
  .quick-entry {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: space-between;
    background-color: #fff;
    li {
      flex: 25%;
      padding: 8px 0;
      a {
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-items: center;
        font-size: 13px;
        img {
          width: 26px;
          height: 26px;
        }
        span {
          color: #222;
        }
      }
    }
  }
  .marvellous {
    margin-top: 10px;
    background-color: #fff;
    .marvellous-title {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
      padding: 10px 0;
      &::before {
        content: "";
        width: 14px;
        height: 1px;
        margin-right: 10px;
        background: linear-gradient(to left, #0f0e0e, #dfdfdf);
      }
      &::after {
        content: "";
        width: 14px;
        height: 1px;
        margin-left: 10px;
        background: linear-gradient(to right, #0f0e0e, #dfdfdf);
      }
    }
    .marvellous-content {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-around;
      align-items: center;
      a {
        flex: 25%;
        img {
          width: 90%;
        }
      }
    }
  }
  .pop-activities {
    background-color: #fff;
    margin-top: 10px;
    .pop-title {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
      padding: 10px 0;
      &::before {
        content: "";
        width: 14px;
        height: 1px;
        margin-right: 10px;
        background: linear-gradient(to left, #0f0e0e, #dfdfdf);
      }
      &::after {
        content: "";
        width: 14px;
        height: 1px;
        margin-left: 10px;
        background: linear-gradient(to right, #0f0e0e, #dfdfdf);
      }
    }
    .pop-content {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
      align-items: center;
      a {
        &:nth-child(-n + 2) {
          flex-direction: row;
          flex-wrap: nowrap;
          dl {
            font-weight: 550;
            font-size: 14px;
          }
          dt {
            font-size: 20px;
          }
          dd {
            margin: 0;
          }
          &:nth-child(1) dt {
            color: #6aabff;
          }
          &:nth-child(2) dt {
            color: #53ca72;
          }
        }
        img {
          width: 85%;
        }
      }
    }

    .pop-sub-content {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-around;
      margin-top: 10px;
      background-color: #fff;
      a {
        img {
          width: 95%;
        }
      }
    }
  }
}
</style>
