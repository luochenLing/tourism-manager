<template>
  <div class="travel-list-layout">
    <nav-bar>
      <div slot="nav-center" @click="getSearch" class="nav-search">
        搜索目的地
      </div>
      <div slot="nav-right" class="address">杭州</div>
    </nav-bar>
    <div class="travel-content">
      <nav-condition :list="conditionList" />
      <van-popup
        v-model="showConditionPopup"
        position="bottom"
        round
        closeable
        :style="{ height: '80%' }"
      >
        <card-list v-show="isDateOrSpecialList" :list="getList()" />
        <classic-condition-list v-if="isRecommendList" :list="getList()" />
      </van-popup>
      <div class="travel-list">
        <product-list :list="proList">
          <template slot="img-info" slot-scope="obj">
            <div class="product-addr">{{ obj.imgInfo.startingPoint }}出发</div>
            <div class="product-price">
              <dfn>{{ obj.imgInfo.priceUint }}</dfn>
              <em class="price-num">{{ obj.imgInfo.priceNum }}</em>
              <span>起</span>
            </div>
            <div class="product-other-info">
              <div class="product-score">
                <van-icon name="like-o" />
                <em>{{ obj.imgInfo.score }}</em>
              </div>
              <em>{{ obj.imgInfo.pCount }}人出游</em>
            </div>
          </template>
          <template slot="content-info" slot-scope="obj">
            <div class="item-tag">{{ obj.contentInfo.protag.join("|") }}</div>
          </template>
        </product-list>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-property-decorator";
import { Icon, Popup } from "vant";
import configEnums from "@/globalConfig/configEmuns";

import NavBar from "@/common/components/navBar.vue";
import ProductList from "./components/productList.vue";
import ClassicConditionList from "./components/condition/classicConditionList.vue";
import NavCondition from "./components/condition/navCondition.vue";
import CardList from "./components/condition/cardList.vue";

export default Vue.extend({
  name: "TravelList",
  components: {
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    NavBar,
    ProductList,
    ClassicConditionList,
    CardList,
    NavCondition
  },
  data() {
    return {
      conditionList: [
        {
          text: "推荐条件",
          code: "recommendList",
          children: [
            { id: 0, text: "推荐排序", code: "" },
            { id: 1, text: "出游人数最高", code: "person" },
            { id: 2, text: "分数最高", code: "score" },
            { id: 3, text: "价格由高到低", code: "priceUp" },
            { id: 4, text: "价格由低到高", code: "priceDown" }
          ]
        },
        {
          text: "日期/计划",
          code: "dateList",
          children: [
            {
              text: "计划天数",
              code: "dateNumList",
              children: [
                { id: 0, text: "1天", count: "62%", code: 1 },
                { id: 1, text: "2天", count: "19%", code: 2 },
                { id: 2, text: "3天", count: "10%", code: 3 },
                { id: 3, text: "4天", count: "", code: 4 },
                { id: 4, text: "5天", count: "70", code: 5 },
                { id: 5, text: "6天", count: "", code: 6 },
                { id: 6, text: "7天", count: "62%", code: 7 },
                { id: 11, text: "8天", count: "19%", code: 8 },
                { id: 21, text: "9天", count: "10%", code: 9 },
                { id: 31, text: "10天", count: "", code: 10 },
                { id: 41, text: "11天", count: "70", code: 11 },
                { id: 51, text: "12天", count: "", code: 12 },
                { id: 10, text: "13天", count: "62%", code: 13 },
                { id: 7, text: "14天", count: "19%", code: 14 },
                { id: 8, text: "14天", count: "10%", code: 15 },
                { id: 9, text: "16天", count: "", code: 16 },
                { id: 12, text: "17天", count: "70", code: 17 },
                { id: 13, text: "18天", count: "", code: 18 }
              ]
            },
            {
              text: "出行日期",
              code: "travelTimeList",
              children: [
                { id: 0, text: "1月", count: "10%", code: "2019-1" },
                { id: 1, text: "2月", count: "90%", code: "2020-2" },
                { id: 2, text: "3月", count: "", code: "2020-3" },
                { id: 3, text: "4月", count: "", code: "2020-4" },
                { id: 4, text: "5月", count: "10%", code: "2019-5" },
                { id: 5, text: "6月", count: "90%", code: "2020-6" },
                { id: 6, text: "7月", count: "", code: "2020-7" },
                { id: 7, text: "8月", count: "", code: "2020-8" },
                { id: 8, text: "9月", count: "10%", code: "2019-9" },
                { id: 9, text: "10月", count: "90%", code: "2020-10" },
                { id: 10, text: "11月", count: "", code: "2020-11" },
                { id: 11, text: "12月", count: "", code: "2020-12" }
              ]
            }
          ]
        },
        {
          text: "玩乐分类",
          code: "specialList",
          children: [
            {
              text: "特色推荐",
              code: "specialList",
              children: [
                { id: 0, text: "海洋乐园", code: "ocean" },
                { id: 1, text: "温泉体验", code: "hotSpring" },
                { id: 2, text: "浪漫海岛", code: "isLand" },
                { id: 3, text: "野生动物园", code: "zoo" },
                { id: 4, text: "人妖表演", code: "simon" }
              ]
            }
          ]
        }
      ],
      proList: [
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
  },
  computed: {
    showConditionPopup: {
      //vuex是单流向数据，只有get不写set的话会在计算双向绑定的如v-model属性的时候报错：
      //Computed 'XXX' property was assigned to but it has no setter.
      get() {
        let $this: any = this;
        return $this.$store.getters[
          "travelFilterCondition/getShowConditionPopup"
        ];
      },
      set(val) {
        let $this: any = this;
        $this.$store.commit("travelFilterCondition/setShowConditionPopup", val);
      }
    },
    isRecommendList() {
      let $this: any = this;
      return (
        $this.$store.getters["travelFilterCondition/getCurFilter"].curCode ==
        configEnums.recommendList
      );
    },
    isDateOrSpecialList() {
      let $this: any = this;
      let value =
        $this.$store.getters["travelFilterCondition/getCurFilter"].curCode;
      return value == configEnums.dateList || value == configEnums.specialList;
    }
  },
  methods: {
    getSearch() {
      this.$router.push("/searchPanel");
    },
    getList() {
      let code = this.$store.getters["travelFilterCondition/getCurFilter"]
        .curCode;
      let list = this.conditionList.filter(item => item.code == code);
      return list;
    }
  }
});
</script>

<style lang="scss" scoped>
em,
dfn {
  font-style: normal;
}

// 插槽部分
.product-addr {
  position: absolute;
  z-index: 1;
  top: 10%;
  left: 5%;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-size: 0.8rem;
  padding: 5px 8px;
  border-radius: 13px;
}
.product-price {
  position: absolute;
  bottom: 10%;
  left: 5%;
  background: #f60;
  padding: 5px;
  font-size: 0.6rem;
  color: #fff;
  .price-num {
    font-size: 0.9rem;
  }
}
.product-other-info {
  position: absolute;
  bottom: 10%;
  right: 5%;
  font-size: 0.8rem;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  display: flex;
  padding: 2px 5px;
  .product-score {
    margin-right: 5px;
    .van-icon-like-o {
      margin-right: 3px;
    }
  }
  border-radius: 12px;
}

.travel-list-layout {
  .nav-search {
    flex: none;
    width: 12rem;
  }
  .address {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 32px;
    max-width: 95px;
    padding-right: 10px;
    &:after {
      content: "";
      border-right: 1px solid black;
      border-top: 1px solid black;
      transform: rotate(134deg);
      width: 7px;
      height: 6px;
      display: inline-block;
      margin-bottom: 3px;
      margin-left: 4px;
    }
  }
  .travel-content {
    padding-top: 50px;
    .products-list {
      margin-top: 24px;
    }
  }
}
</style>
