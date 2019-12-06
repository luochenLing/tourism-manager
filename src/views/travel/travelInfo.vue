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
      <div class="coupon">
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
      <div class="activity">
        <span class="activity-title">
          活动
        </span>
        <div class="activity-count">2个</div>
        <div class="activity-list">
          <span class="activity-item">点评返现</span>
          <span class="activity-item">支付优惠</span>
        </div>
      </div>
    </section>

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
        · 传真签约：双方在合同上签字盖章后，通过传真进行签约。
      </div>
    </section>
    <section class="notice">
      <div class="notice-title">预订须知</div>
      <div class="notice-content">
        ·
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
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-property-decorator";
import { Swipe, SwipeItem, Icon } from "vant";
import RecommendProList from "./components/recommendProList.vue";
export default Vue.extend({
  name: "TravelInfo",
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Icon.name]: Icon,
    RecommendProList
  },
  methods: {
    goBack() {
      this.$router.back();
    }
  },
  data() {
    return {
      images: [
        "/images/home/swipper01.jpg",
        "/images/home/swipper02.jpg",
        "/images/home/swipper03.jpg"
      ],
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
      ]
    };
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
          // 设置inline-block后，只设置行高就可以了，这里是防止溢出后成员显示不完全的BUG
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
      padding-left: 10px;
      margin-bottom: 10px;
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
  }

  .pro-info-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    background: #fff;
    border-top: 1px solid #d4d4d4;
    z-index: 1;
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
