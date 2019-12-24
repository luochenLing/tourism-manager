<template>
  <div class="travel-info-layout">
    <div class="swiper-info">
      <van-swipe :autoplay="3000" indicator-color="white" class="index-swiper">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
      <i class="back" @click="goBack"></i>
      <span class="pro-no">产品编号:123456789</span>
    </div>

    <section class="pro-des">
      <h2 class="title">
        毛里求斯5晚7或8日自由行
        销量明星款，上海出发+可搭配全国联运+热门五星集锦+洲际/长滩/美岸/鹿饮泉/四季，可私人订制
      </h2>
      <div class="profile">
        <span class="price">
          <dfn>￥</dfn>
          <span>11693</span>
          <em>起</em>
        </span>
        <span class="score">4.8分</span>
        <span class="count">455人出游</span>
      </div>
      <div class="tag">上门接|上门接|上门接</div>
    </section>
    <section class="discount">
      <div class="coupon" @click="showPopup('coupon')">
        <span class="coupon-title">
          领券
        </span>
        <div class="coupon-count">3个</div>
        <div class="coupon-list">
          <span class="coupon-item">满1000反100</span>
          <span class="coupon-item">满2000反2000</span>
          <span class="coupon-item">满50000反1000</span>
        </div>
      </div>
      <div class="activity" @click="showPopup('activity')">
        <span class="activity-title">
          活动
        </span>
        <div class="activity-count">2个</div>
        <div class="activity-list">
          <span class="activity-item">点评返现</span>
          <span class="activity-item">支付优惠</span>
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
      <div class="feature-content">
        ·
        在线签约：通过在线签约页面进行签约，付款成功后，将通过电子邮件接收电子版合同，与门市签约及传真签约同等有效。
        · 传真签约：双方在合同上签字盖章后，通过传真进行签约。
      </div>
    </section>
    <section class="recommend">
      <div class="recommend-title">推荐行程</div>
      <div class="recommend-content">
        ·
        在线签约：通过在线签约页面进行签约，付款成功后，将通过电子邮件接收电子版合同，与门市签约及传真签约同等有效。
        · 传真签约：双方在合同上签字盖章后，通过传真进行签约。
      </div>
    </section>
    <section class="explain">
      <div class="explain-title">费用说明</div>
      <div class="explain-content">
        ·
        在线签约：通过在线签约页面进行签约，付款成功后，将通过电子邮件接收电子版合同，与门市签约及传真签约同等有效。
        · 传真签约：双方在合同上签字盖章后，通过传真进行签约。 ·
        在线签约：通过在线签约页面进行签约，付款成功后，将通过电子邮件接收电子版合同，与门市签约及传真签约同等有效。
        · 传真签约：双方在合同上签字盖章后，通过传真进行签约。 ·
        在线签约：通过在线签约页面进行签约，付款成功后，将通过电子邮件接收电子版合同，与门市签约及传真签约同等有效。
        · 传真签约：双方在合同上签字盖章后，通过传真进行签约。 ·
        在线签约：通过在线签约页面进行签约，付款成功后，将通过电子邮件接收电子版合同，与门市签约及传真签约同等有效。
        · 传真签约：双方在合同上签字盖章后，通过传真进行签约。
      </div>
    </section>
    <section class="notice">
      <div class="notice-title">预订须知</div>
      <div class="notice-content">
        ·
        在线签约：通过在线签约页面进行签约，付款成功后，将通过电子邮件接收电子版合同，与门市签约及传真签约同等有效。
        · 传真签约：双方在合同上签字盖章后，通过传真进行签约。 ·
        在线签约：通过在线签约页面进行签约，付款成功后，将通过电子邮件接收电子版合同，与门市签约及传真签约同等有效。
        · 传真签约：双方在合同上签字盖章后，通过传真进行签约。 ·
        在线签约：通过在线签约页面进行签约，付款成功后，将通过电子邮件接收电子版合同，与门市签约及传真签约同等有效。
        · 传真签约：双方在合同上签字盖章后，通过传真进行签约。 ·
        在线签约：通过在线签约页面进行签约，付款成功后，将通过电子邮件接收电子版合同，与门市签约及传真签约同等有效。
        · 传真签约：双方在合同上签字盖章后，通过传真进行签约。 ·
        在线签约：通过在线签约页面进行签约，付款成功后，将通过电子邮件接收电子版合同，与门市签约及传真签约同等有效。
        · 传真签约：双方在合同上签字盖章后，通过传真进行签约。
      </div>
    </section>
    <section class="pro-recommend">
      <div class="pro-recommend-title">相关产品推荐</div>
      <recommend-pro-list :list="recommentList"> </recommend-pro-list>
    </section>
    <div class="pro-info-footer">
      <div class="customer-service">
        <van-icon name="service-o" size="22" />
        <span>在线客服</span>
      </div>
      <div class="collection">
        <van-icon name="star-o" size="22" />
        <span>收藏</span>
      </div>
      <div class="reserve">立即预定</div>
    </div>
    <van-icon
      class="top-btn"
      name="upgrade"
      @click="goTop"
      v-show="showTopBtn"
    ></van-icon>
  </div>
</template>
<script lang="ts" scoped>
import { Vue } from "vue-property-decorator";
import { Swipe, SwipeItem, Icon, Popup } from "vant";
import RecommendProList from "./components/recommendProList.vue";
import Coupon from "./components/coupon.vue";
import Activity from "./components/activity.vue";
export default Vue.extend({
  name: "TravelInfo",
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    RecommendProList,
    Coupon,
    Activity
  },
  data() {
    return {
      images: [
        "/images/home/swipper01.jpg",
        "/images/home/swipper02.jpg",
        "/images/home/swipper03.jpg"
      ],
      activePopup: "",
      showCoupon: false,
      showTopBtn: false,
      tabIndex: 0,
      tabHeight: 46,
      //推荐列表
      recommentList: [
        {
          id: "1",
          title: "[春节]泰国曼谷-芭堤雅-沙美岛6或7日游",
          description:
            "纯玩可离团,全程五星/打卡双夜市+实弹射击+水上市场+人妖表演/光海鲜+日落悬崖餐厅/全程领队,省心出游",
          priceNum: "3296",
          priceUint: "￥",
          score: "4.9",
          pCount: "1.9万",
          protag: ["上门接", "无自费", "立减"],
          startingPoint: "杭州",
          imgUrl: "/images/travel/territory1.jpg",
          category: "0"
        },
        {
          id: "2",
          title: "华东五市-苏州园林-杭州-乌镇火车5日游",
          description:
            "暖冬预售,深度纯玩0购物，国际五星酒店+确保入住西栅&拈花湾双客栈，50元高标餐，2万+牛人选择，6年高销量",
          priceNum: "1780",
          priceUint: "￥",
          score: "4.9",
          pCount: "4009",
          protag: ["上门接", "无自费", "立减"],
          startingPoint: "杭州",
          imgUrl: "/images/travel/territory2.jpg",
          category: "1"
        },
        {
          id: "3",
          title: "杭州-乌镇-西塘高铁动车3日游",
          description:
            "纯玩0购物，2晚5星酒店，享5星自助早，50餐标，夜宿乌镇，游西栅送东栅，11点15点自选",
          priceNum: "665",
          priceUint: "￥",
          score: "9.0",
          pCount: "128",
          protag: ["上门接", "无自费", "立减"],
          startingPoint: "嘉兴",
          imgUrl: "/images/travel/territory3.jpg",
          category: "1"
        }
      ],
      //活动列表
      activityList: [
        {
          id: 0,
          startTime: "2019-1-1",
          endTime: "2019-1-2",
          title: "【海南春节预售】提前30天及以上优惠200元/成人",
          explain:
            "1、预订指定线路指定团期，提交订单时，勾选“立减优惠”即可扣减相应金额，保险不含。2、儿童价不享受该优惠政策。3、本次活动按双人出行共用一间房核算单人价格，最终成行价格将根据所选出发日期、住宿房型、交通以及所选附加服务不同而有所不同，以客服与您确认需求后核算价格为准。",
          tag: "立减优惠"
        },
        {
          id: 1,
          startTime: "2018-10-1",
          endTime: "2019-1-2",
          title: "【多人立减】满6成人立减600/单",
          explain:
            "1、预订指定线路指定团期，提交订单时，勾选“立减优惠”即可扣减相应金额，保险不含。2、儿童价不享受该优惠政策。3、本次活动按双人出行共用一间房核算单人价格，最终成行价格将根据所选出发日期、住宿房型、交通以及所选附加服务不同而有所不同，以客服与您确认需求后核算价格为准。",
          tag: "立减优惠"
        },
        {
          id: 2,
          startTime: "2018-11-1",
          endTime: "2018-12-2",
          title: "点评返现5元，抵用券20元",
          explain:
            "自行于网上下单预订，出游归来后发表点评，每成人返现5元（电话订单除外），返现上限金额为实付金额（包括旅游券）的3%。网上预订，出游归来后发表点评，每位成人返抵用券20元。点评后，请至会员中心查看账户余额。",
          tag: "点评返现"
        },
        {
          id: 3,
          startTime: "2019-10-1",
          endTime: "2020-1-2",
          title: "邮储银联信用卡最高立减500元/单",
          explain:
            "邮储银联信用卡支付立减活动时间：2019.10.26-2020.1.31（每天10:00-23:59）单卡活动期间限参加1次。活动细则：1.本次立减活动名额限5,880单，其中平日活动每日45个名额，周六活动每日150个名额，每日以持卡人使用邮储银联信用卡成功支付的时间先后顺序、先到先得。活动以补贴名额或补贴金额用完的先到时间为限，抢完即止。点击进入“云闪付”的时间必须从每日10点开始，提前点击进入云闪付无法享受此次优惠。如最终支付未显示立减金额，则表示名额已用完。2.立减活动的优惠金额部分不可兑换现金。如在成功支付后，因持卡人原因发生订单退货或订单增减，持卡人应承担因订单退货或订单增减而产生的团费损失。退款金额优先抵扣邮储银联信用卡提供的立减优惠。优惠名额为一次性使用，如已使用优惠名额后退货或订单增减，不可再次享受优惠。",
          tag: "支付优惠"
        }
      ],
      //优惠券列表
      couponList: [
        {
          id: 0,
          title: "每2000立减100元（最多300元）",
          price: "300",
          startTime: "2019-12-1",
          endTime: "2019-12-31",
          isReceive: false,
          rule:
            "1.订单需2人起订且持卡人本人须出行，并以志愿者公益龙卡信用卡、龙卡汽车卡、沪通龙卡信用卡、交通便民龙卡信用卡、上海热购信用卡、上海旅游热购信用卡、家庭挚爱信用卡银联版、全球支付卡、JOY卡银联版、Linefriends信用卡、尊享白金信用卡、钻石信用卡、智尊信用卡全额支付，在订单提交页勾选“上海建行指定龙卡专享”，方可享受每单立减200优惠。2.活动优惠名额有限，先到先得，售完即止。3.每位用户整个活动期间仅限享受1次优惠。4.本活动不可使用礼品卡和其他第三方支付方式支付。",
          explain:
            "华夏信用卡分期立减-跟团游/邮轮每满2000元减100元优惠，每单最高减300元"
        },
        {
          id: 1,
          title: "每2000立减100元（最多500元）",
          price: "500",
          startTime: "2019-11-1",
          endTime: "2019-12-22",
          isReceive: true,
          rule:
            "1.订单需2人起订且持卡人本人须出行，并以志愿者公益龙卡信用卡、龙卡汽车卡、沪通龙卡信用卡、交通便民龙卡信用卡、上海热购信用卡、上海旅游热购信用卡、家庭挚爱信用卡银联版、全球支付卡、JOY卡银联版、Linefriends信用卡、尊享白金信用卡、钻石信用卡、智尊信用卡全额支付，在订单提交页勾选“上海建行指定龙卡专享”，方可享受每单立减200优惠。2.活动优惠名额有限，先到先得，售完即止。3.每位用户整个活动期间仅限享受1次优惠。4.本活动不可使用礼品卡和其他第三方支付方式支付。",
          explain: "华夏小羊肖恩亲子卡金卡每满2000减100 每单最高减500元"
        },
        {
          id: 2,
          title: "每2000立减100元（最多300元）",
          price: "300",
          startTime: "2020-1-1",
          endTime: "2020-1-31",
          isReceive: true,
          rule:
            "1.订单需2人起订且持卡人本人须出行，并以志愿者公益龙卡信用卡、龙卡汽车卡、沪通龙卡信用卡、交通便民龙卡信用卡、上海热购信用卡、上海旅游热购信用卡、家庭挚爱信用卡银联版、全球支付卡、JOY卡银联版、Linefriends信用卡、尊享白金信用卡、钻石信用卡、智尊信用卡全额支付，在订单提交页勾选“上海建行指定龙卡专享”，方可享受每单立减200优惠。2.活动优惠名额有限，先到先得，售完即止。3.每位用户整个活动期间仅限享受1次优惠。4.本活动不可使用礼品卡和其他第三方支付方式支付。",
          explain: "【12月】光大信用卡“魅力海南旅游节”海南国内长线满2000减300"
        },
        {
          id: 3,
          title: "满300元可用",
          price: "50",
          startTime: "2019-12-12",
          endTime: "2019-12-21",
          isReceive: false,
          rule:
            "1.订单需2人起订且持卡人本人须出行，并以志愿者公益龙卡信用卡、龙卡汽车卡、沪通龙卡信用卡、交通便民龙卡信用卡、上海热购信用卡、上海旅游热购信用卡、家庭挚爱信用卡银联版、全球支付卡、JOY卡银联版、Linefriends信用卡、尊享白金信用卡、钻石信用卡、智尊信用卡全额支付，在订单提交页勾选“上海建行指定龙卡专享”，方可享受每单立减200优惠。2.活动优惠名额有限，先到先得，售完即止。3.每位用户整个活动期间仅限享受1次优惠。4.本活动不可使用礼品卡和其他第三方支付方式支付。",
          explain: "江苏银行信用卡周周减-满300立减50元"
        },
        {
          id: 4,
          title: "满3000元可用",
          price: "100",
          startTime: "2019-10-1",
          endTime: "2019-12-31",
          isReceive: true,
          rule:
            "1.订单需2人起订且持卡人本人须出行，并以志愿者公益龙卡信用卡、龙卡汽车卡、沪通龙卡信用卡、交通便民龙卡信用卡、上海热购信用卡、上海旅游热购信用卡、家庭挚爱信用卡银联版、全球支付卡、JOY卡银联版、Linefriends信用卡、尊享白金信用卡、钻石信用卡、智尊信用卡全额支付，在订单提交页勾选“上海建行指定龙卡专享”，方可享受每单立减200优惠。2.活动优惠名额有限，先到先得，售完即止。3.每位用户整个活动期间仅限享受1次优惠。4.本活动不可使用礼品卡和其他第三方支付方式支付。",
          explain: "【交行普惠活动】交行信用卡国内产品订单满3000减100元"
        }
      ]
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    showPopup(tag: string) {
      this.showCoupon = true;
      this.activePopup = tag;
    },
    scrollListener() {
      let scrollTop =
        document.documentElement.scrollTop ||
        document.body.scrollTop; 
      this.getTabByScrollPosition(scrollTop);
      this.getTopBtn();
    },
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
    },
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
    },
    goTop() {
        document.documentElement.scrollTop=document.body.scrollTop=0
      //   window.pageYOffset ||
      //   document.body.scrollTop;
      //   alert(scrollTop);
      // scrollTop = 0;
    },
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
    },
    //领取优惠券
    receiveCoupon(index: number, flag: boolean) {
      this.couponList[index].isReceive = flag;
    },
    getDom(el: string): HTMLElement {
      return <HTMLElement>document.querySelector(el);
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scrollListener, false);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollListener);
  }
});
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
      margin-bottom: 10px;
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

  .top-btn {
    position: fixed;
    bottom: 120px;
    right: 10px;
    border-radius: 100%;
    font-size: 40px;
    background: #fff;
    overflow: hidden;
    color: rgba(76, 91, 109, 0.9);
    z-index: 999;
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
