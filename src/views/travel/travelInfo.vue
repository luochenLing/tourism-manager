<template>
  <div class="travel-info-layout">
    <vue-element-loading
      :active="loading"
      background-color="#f0f0f0"
      :is-full-screen="true"
    >
      <img src="@/images/common/loading.gif" alt="" v-if="loading" />
    </vue-element-loading>
    <div class="swiper-info">
      <van-swipe :autoplay="3000" indicator-color="white" class="index-swiper">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
      <i class="back" @click="goBack"></i>
      <span class="pro-no">产品编号:{{ travelInfo.proId | getNo }}</span>
    </div>

    <section class="pro-des">
      <h2 class="title">
        {{ travelInfo.proTitle }}
      </h2>
      <div class="profile">
        <span class="price">
          <dfn>{{ travelInfo.priceUint }}</dfn>
          <span>{{ travelInfo.proPrice }}</span>
          <em>起</em>
        </span>
        <span class="score">{{ travelInfo.proScore }}分</span>
        <span class="count">{{ travelInfo.proPCount | million }}人出游</span>
      </div>
      <div class="tag">{{ travelInfo.proTag | getProTage }}</div>
    </section>
    <section class="discount">
      <div
        class="coupon"
        v-show="travelInfo.isCoupon"
        @click="showPopup('coupon')"
        v-if="couponTags.titles && couponTags.titles.length > 0"
      >
        <span class="coupon-title">
          领券
        </span>
        <div class="coupon-count">
          {{ couponTags.count ? couponTags.count : "" }}
        </div>
        <div class="coupon-list">
          <span
            class="coupon-item"
            v-for="(item, index) in couponTags.titles"
            :key="index"
            >{{ item }}</span
          >
        </div>
      </div>
      <div
        class="activity"
        @click="showPopup('activity')"
        v-if="activityTags.titles && activityTags.titles.length > 0"
      >
        <span class="activity-title">
          活动
        </span>
        <div class="activity-count">
          {{ activityTags.count ? activityTags.count : "" }}
        </div>
        <div class="activity-list">
          <span
            class="activity-item"
            v-for="(item, index) in activityTags.titles"
            :key="index"
            >{{ item }}</span
          >
        </div>
      </div>
      <van-popup
        class="coupon-popup"
        v-model="showCoupon"
        position="bottom"
        round
        closeable
      >
        <coupon
          :list="couponList"
          v-show="activePopup == 'coupon'"
          @receiveCoupon="receiveCoupon"
        />
        <activity :list="activityList" v-show="activePopup == 'activity'" />
      </van-popup>
    </section>
    <ul class="head-tab">
      <li :class="tabIndex == 0 ? 'active' : ''" @click.stop="anchorLink(0)">
        产品特色
      </li>
      <li :class="tabIndex == 1 ? 'active' : ''" @click.stop="anchorLink(1)">
        推荐行程
      </li>
      <li :class="tabIndex == 2 ? 'active' : ''" @click.stop="anchorLink(2)">
        费用说明
      </li>
      <li :class="tabIndex == 3 ? 'active' : ''" @click.stop="anchorLink(3)">
        预订须知
      </li>
    </ul>
    <section class="feature">
      <div class="feature-title">产品特色</div>
      <div class="feature-content" v-html="travelInfo.proCharacteristic"></div>
    </section>
    <section class="recommend">
      <div class="recommend-title">推荐行程</div>
      <div class="recommend-content" v-html="travelInfo.proRecommend"></div>
    </section>
    <section class="explain">
      <div class="explain-title">费用说明</div>
      <div class="explain-content" v-html="travelInfo.proNotice"></div>
    </section>
    <section class="notice">
      <div class="notice-title">预订须知</div>
      <div class="notice-content" v-html="travelInfo.proNotice"></div>
    </section>
    <section class="pro-recommend">
      <div class="pro-recommend-title">相关产品推荐</div>
      <recommend-pro-list :list="recommentList"> </recommend-pro-list>
    </section>
    <div class="pro-info-footer">
      <div class="customer-service" @click="goToServer">
        <van-icon name="service-o" size="22" />
        <span>在线客服</span>
      </div>
      <div class="collection">
        <van-icon name="star-o" size="22" />
        <span>收藏</span>
      </div>
      <div class="reserve">立即预定</div>
    </div>
    <top-icon v-show="showTopBtn"></top-icon>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { Swipe, SwipeItem, Popup, Icon, Toast } from "vant";
var VueElementLoading = require("vue-element-loading");
import RecommendProList from "./components/recommendProList.vue";
import Coupon from "./components/coupon.vue";
import Activity from "./components/activity.vue";
import topIcon from "@/common/components/topIcon.vue";
import TourismService from "@/services/tourismService";
import ErrorPage from "@/common/components/error.vue";
import common from "@/utils/common";
import proMixin from "@/views/travel/mixins/proMixin";
import Cookie from "js-cookie";
import SocketHandler from "@/utils/socketHandler";
import configEnums from '@/globalConfig/configEmuns';

Vue.use(Toast);
@Component({
  name: "TravelInfo",
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Popup.name]: Popup,
    [Icon.name]: Icon,
    VueElementLoading,
    RecommendProList,
    Coupon,
    Activity,
    topIcon
  },
  filters: {
    getNo: function(val: string) {
      if (val) {
        return val.substr(0, 8);
      } else {
        return "";
      }
    }
  }
})
class travelInfo extends proMixin {
  images = [
    // "/images/home/swipper01.jpg",
    // "/images/home/swipper02.jpg",
    // "/images/home/swipper03.jpg"
  ];
  loading = true;
  activePopup = "";
  showCoupon = false;
  showTopBtn = false;
  tabIndex = 0;
  tabHeight = 46;
  travelInfo: any = {};
  //相关产品推荐列表
  recommentList = [];
  //活动列表
  activityList = [];
  //优惠券列表
  couponList = [];

  couponTags = {};

  activityTags = {};

  created() {
    this.getData();
  }

  /**
   * 通过监控路由发现当前页面数据变动后重新获取数据
   */
  @Watch("$route")
  getRoute(to: any, from: any) {
    this.getData();
  }
  getData() {
    this.loading = true;
    let { proId } = this.$route.query;
    Promise.all([
      this.GetTravelInfoById(<string>proId),
      this.GetMediaInfoListById(<string>proId),
      this.GetTravelActivityListByProId(<string>proId)
    ])
      .then(ret => {
        this.loading = false;
      })
      .catch(err => {
        this.loading = false;
        let text = common.GetHttpCodeMsg(err.response.status);
        let url = `/error?showNav=true&text=${text}`;
        this.$router.replace(url);
      });
  }

  mounted() {
    window.addEventListener("scroll", this.scrollListener, false);
    document.documentElement.scrollTop = document.body.scrollTop = 0;
  }

  destroyed() {
    window.removeEventListener("scroll", this.scrollListener);
  }

  goBack() {
    this.$router.back();
  }

  showPopup(tag: string) {
    this.showCoupon = true;
    this.activePopup = tag;
  }

  scrollListener() {
    let scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    this.getTabByScrollPosition(scrollTop);
    this.getTopBtn();
  }

  //获取置顶按钮
  getTopBtn() {
    let scrollTop =
      document.documentElement.scrollTop ||
      window.pageYOffset ||
      document.body.scrollTop;
    if (scrollTop > 200) {
      this.showTopBtn = true;
    } else {
      this.showTopBtn = false;
    }
  }

  //根据滚动条标记选中Tab
  getTabByScrollPosition(scrollTop: number) {
    let featureTop = this.getDom(".feature").offsetTop - this.tabHeight;
    let featureBottom =
      this.getDom(".feature").offsetTop +
      this.getDom(".feature").offsetHeight -
      this.tabHeight;
    let recommendTop = this.getDom(".recommend").offsetTop - this.tabHeight;
    let recommendBottom =
      this.getDom(".recommend").offsetTop +
      this.getDom(".recommend").offsetHeight -
      this.tabHeight;
    let explainTop = this.getDom(".explain").offsetTop - this.tabHeight;
    let explainBottom =
      this.getDom(".explain").offsetTop +
      this.getDom(".explain").offsetHeight -
      this.tabHeight;
    let noticeTop = this.getDom(".notice").offsetTop - this.tabHeight;
    let noticeBottom =
      this.getDom(".notice").offsetTop +
      this.getDom(".notice").offsetHeight -
      this.tabHeight;
    if (scrollTop >= featureTop && scrollTop <= featureBottom) {
      this.tabIndex = 0;
    } else if (scrollTop >= recommendTop && scrollTop <= recommendBottom) {
      this.tabIndex = 1;
    } else if (scrollTop >= explainTop && scrollTop <= explainBottom) {
      this.tabIndex = 2;
    } else if (scrollTop >= noticeTop && scrollTop <= noticeBottom) {
      this.tabIndex = 3;
    }
  }

  anchorLink(index: number) {
    this.tabIndex = index;
    let height = 0;
    switch (index) {
      case 0:
        height = this.getDom(".feature").offsetTop - this.tabHeight;
        break;
      case 1:
        height = this.getDom(".recommend").offsetTop - this.tabHeight;
        break;
      case 2:
        height = this.getDom(".explain").offsetTop - this.tabHeight;
        break;
      case 3:
        height = this.getDom(".notice").offsetTop - this.tabHeight;
        break;
    }
    if (height <= this.tabHeight) {
      return;
    }
    document.documentElement.scrollTop = document.body.scrollTop = height;
  }

  //领取优惠券
  receiveCoupon(index: number, flag: boolean) {
    (<any>this.couponList[index]).isReceive = flag;
  }

  getDom(el: string): HTMLElement {
    return <HTMLElement>document.querySelector(el);
  }

  goToServer() {
    let sid = Cookie.get("uid");
    let url = `${configEnums.websocketUrl}/ws?sid=${sid}`;
    
    SocketHandler.InitSocket(url);
    
    SocketHandler.onOpen(() => {
      this.$router.push("/chatBox");
      console.log("is connection...");
    });

    SocketHandler.onError((e: any) => {
      console.log(e);
      Toast.fail("连接异常");
    });

    SocketHandler.onClose((e: any) => {
      console.log("连接已关闭...", e);
    });
  }

  GetTravelInfoById(proId: string) {
    TourismService.GetTravelInfoById(proId)
      .then(ret => {
        return new Promise((resolve: Function, reject: Function) => {
          if (ret.data && ret.data.resultData) {
            this.travelInfo = ret.data.resultData;
            resolve(this.travelInfo);
          } else {
            let text = common.GetHttpCodeMsg(-1);
            let url = `/error?showNav=true&text=${text}&title=${text}`;
            this.$router.replace(url);
          }
        });
      })
      .then((ret: any) => {
        if (ret) {
          this.GetCouponListByUserId(
            "f3f13528-293b-4c6b-b818-6305c37e8668",
            ret.isCoupon
          );
          this.GetRelatedProducts(ret.proDestination, ret.proId);
        }
      })
      .catch(err => {
        this.loading = false;
        let text = common.GetHttpCodeMsg(err.response.status);
        let url = `/error?showNav=true&text=${text}&title=${text}`;
        this.$router.replace(url);
      });
  }

  GetMediaInfoListById(proId: string) {
    TourismService.GetMediaInfoListById(proId).then(ret => {
      if (ret.data && ret.data.resultData) {
        this.images = ret.data.resultData.map((val: any, idx: any) => {
          return val.mUrl;
        });
      }
    });
  }

  GetCouponListByUserId(userId: string, iscoupon: boolean) {
    if (!iscoupon) {
      return;
    }

    TourismService.GetCouponListByUserId(userId).then(ret => {
      if (ret.data && ret.data.resultData) {
        this.couponList = ret.data.resultData;
        let titles = this.couponList.map((val: any, idx: any) => {
          return `${val.price}元`;
        });
        let count = titles.length;
        titles = Array.from(new Set(titles));
        this.couponTags = { count, titles };
      }
    });
  }

  GetTravelActivityListByProId(proId: string) {
    TourismService.GetTravelActivityListByProId(proId).then(ret => {
      if (ret.data && ret.data.resultData) {
        this.activityList = ret.data.resultData;
        let titles = this.activityList.map((val: any, idx: any) => {
          return val.tag;
        });
        let count = titles.length;
        titles = Array.from(new Set(titles));
        this.activityTags = { count, titles };
      }
    });
  }

  GetRelatedProducts(areaName: string, proId: string) {
    TourismService.RelatedProducts(areaName).then(ret => {
      if (ret.data && ret.data.resultData) {
        this.recommentList = ret.data.resultData.filter((item: any) => {
          return item.proId != proId;
        });
      }
    });
  }
}

export default travelInfo;
</script>

<style lang="scss" scoped>
.travel-info-layout {
  background-color: #edf0f5;
  padding-bottom: 60px;
  .swiper-info {
    background: #fff;
    position: relative;
    height: 180px;
    .index-swiper {
      width: 100%;
      img {
        width: 100%;
        height: 180px;
      }
    }
    .back {
      position: absolute;
      top: 5%;
      left: 5%;
      display: block;
      width: 2rem;
      height: 2rem;
      z-index: 1;
      background: rgba(34, 34, 34, 0.6);
      border-radius: 50%;
      &::after {
        content: "";
        border-top: 1px solid #fff;
        border-right: 1px solid #fff;
        display: block;
        width: 35%;
        height: 35%;
        transform: rotate(228deg);
        position: absolute;
        top: 28%;
        left: 32%;
      }
    }
    .pro-no {
      position: absolute;
      color: #fff;
      font-size: 12px;
      bottom: 10%;
      right: 5%;
    }
  }

  .pro-des {
    background: #fff;
    font-size: 12px;
    padding: 20px 15px 15px 15px;
    .title {
      margin: 0 0 10px 0;
    }
    .profile {
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      .price {
        font-size: 20px;
        color: #f50;
        dfn,
        em {
          font-size: 15px;
        }
        margin-right: 20px;
      }
      .score {
        font-size: 16px;
        color: #999;
        margin-right: 20px;
      }
      .count {
        font-size: 16px;
        color: #999;
      }
    }

    .tag {
      font-size: 16px;
      color: #999;
      margin-top: 15px;
    }
  }
  .head-tab {
    display: flex;
    background: #fff;
    height: 46px;
    margin: 10px 0 -1px 0;
    position: sticky;
    top: 0;
    z-index: 10;
    justify-content: space-evenly;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    li {
      line-height: 46px;
      font-size: 15px;
    }
    .active {
      color: #2dbb55;
      border-bottom: 2px solid #2dbb55;
    }
  }
  .discount {
    margin-top: 10px;
    background-color: #fff;
    padding: 0 17px;
    .coupon {
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      color: #999;
      .coupon-title {
        flex: 20%;
        float: left;
        line-height: 50px;
        height: 50px;
      }
      .coupon-list {
        line-height: 50px;
        height: 50px;
        overflow: hidden;
        margin: 0 24px 0 70px;
        .coupon-item {
          font-size: 12px;
          margin-right: 8px;
          color: #f50;
          border: 1px solid #f50;
          border-radius: 5px;
          padding: 5px;
          //设置inline-block后，只设置行高就可以了，这里是防止溢出后成员显示不完全的BUG
          //需要固定父元素高度，不然overflow失效
          display: inline-block;
          line-height: 15px;
        }
      }
      .coupon-count {
        flex: 10%;
        float: right;
        line-height: 50px;
        height: 50px;
      }
    }
    .activity {
      font-size: 16px;
      color: #999;
      height: 50px;
      line-height: 50px;
      .activity-title {
        float: left;
      }
      .activity-count {
        float: right;
      }
      .activity-list {
        margin: 0 30px 0 70px;
        font-size: 12px;
        color: #f50;
        overflow: hidden;
        height: 50px;
        line-height: 50px;
        .activity-item {
          border: 1px solid #f50;
          padding: 5px;
          border-radius: 5px;
          margin-right: 8px;
          display: inline-block;
          line-height: 15px;
        }
      }
    }
    .coupon-popup {
      overflow: hidden;
      height: 80%;
      &::before {
        content: "";
        display: block;
        width: 100%;
        height: 40px;
      }
    }
  }

  .feature,
  .recommend,
  .explain,
  .notice,
  .pro-recommend {
    margin-top: 10px;
    background: #fff;
    padding: 10px 15px 0px 15px;
    .feature-title,
    .recommend-title,
    .explain-title,
    .notice-title,
    .pro-recommend-title {
      position: relative;
      font-size: 16px;
      font-weight: 600;
      height: 20px;
      margin-bottom: 10px;
      padding-left: 10px;
      &::before {
        content: "";
        position: absolute;
        background: #f50;
        width: 5px;
        height: 20px;
        left: 0;
      }
    }
    .recommend-title {
      &::before {
        content: "";
        background: #33bd61;
      }
    }
    .explain-title {
      &::before {
        content: "";
        background: #4b90ed;
      }
    }
    .notice-title {
      &::before {
        content: "";
        background: #9ed969;
      }
    }
    .pro-recommend-title {
      &::before {
        content: "";
        background: #f80;
      }
    }

    .recommend-content,
    .feature-content,
    .explain-content,
    .notice-content {
      padding: 5px 0;
      line-height: 18px;
    }
  }
  .feature {
    margin-top: 0;
  }
  .pro-recommend {
    padding-bottom: 5px;
  }

  .pro-info-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    background: #fff;
    border-top: 1px solid #d4d4d4;
    z-index: 11;
    display: flex;
    justify-content: space-around;
    align-items: center;
    div {
      height: 50px;
      text-align: center;
      i {
        position: relative;
        top: 6px;
      }
      span {
        display: block;
        margin-top: 6px;
      }
    }
    .customer-service {
      flex: 1;
    }
    .collection {
      flex: 1;
    }
    .reserve {
      flex: 2;
      background-color: #f80;
      color: #fff;
      font-size: 16px;
      line-height: 50px;
    }
  }
}

// 插件部分
/deep/ .special-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .special-item {
    width: 50%;
    box-sizing: border-box;
    // 这里使用>>>不能被sass识别。deep效果是一样的,同时也可以如下写法
    .infos {
      margin-bottom: 0;
    }
    h3 {
      display: -webkit-box;
      text-overflow: ellipsis;
      overflow: hidden;
      -webkit-line-clamp: 3;
      line-clamp: 3;
      -webkit-box-orient: vertical;
      height: 48px;
      line-height: initial;
      white-space: initial;
    }
  }
}
//eg:
// .special-item /deep/.infos {
//       margin-bottom: 0;
// }
</style>
