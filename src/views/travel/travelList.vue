<template>
  <div class="travel-list-layout">
    <nav-bar>
      <div slot="nav-center" @click="getSearch" class="nav-search">
        搜索目的地
      </div>
      <div slot="nav-right" class="address">杭州</div>
    </nav-bar>
    <div class="travel-content">
      <ul class="condition">
        <li class="select-item">推荐排序</li>
        <li class="unselect-item">天数/日期</li>
        <li class="unselect-item">玩乐分类</li>
        <li class="unselect-item">更多筛选</li>
      </ul>
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
import NavBar from "@/common/components/navBar.vue";
import ProductList from "./components/productList.vue";
import { Icon } from "vant";

export default Vue.extend({
  name: "TravelList",
  components: {
    [Icon.name]: Icon,
    NavBar,
    ProductList
  },
  data() {
    return {
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
      ],
    };
  },
  methods: {
    getSearch() {
      this.$router.push("/searchPanel");
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
    .condition {
      display: flex;
      justify-content: space-evenly;
      height: 32px;
      line-height: 32px;
      position: fixed;
      z-index: 99;
      width: 100%;
      background: #fff;
      .select-item,
      .unselect-item {
        line-height: 32px;
        &::after {
          content: "";
          background: url("/images/common/icon-sprite.png") no-repeat;
          transform: scale(0.5);
          width: 20px;
          height: 32px;
          line-height: 32px;
          display: inline-block;

          background-position: 0px -283px;
          vertical-align: middle;
        }
      }
      .select-item {
        color: #23cc77;
        &::after {
          background-position: -23px -283px;
        }
      }
    }
    .products-list {
      margin-top: 24px;
    }
  }
}
</style>
