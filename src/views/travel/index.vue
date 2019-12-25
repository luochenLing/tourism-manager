<template>
  <div class="travel-layout">
    <nav-bar>
      <div slot="nav-center" @click="searchPanelByCategory" class="nav-search">
        搜索目的地
      </div>
      <div slot="nav-right" class="nav-my-info">我的</div>
    </nav-bar>
    <van-swipe :loop="false">
      <van-swipe-item>
        <div class="btn-list">
          <router-link to="/travel/travelList">
            <img src="../../images/travel/tourist-group.png" alt="" />
            <span>跟团游</span>
          </router-link>
          <a>
            <img src="../../images/travel/free-travel.png" alt="" />
            <span>自由行</span>
          </a>
          <a>
            <img src="../../images/travel/cruise.png" alt="" />
            <span>游轮</span>
          </a>
          <a>
            <img src="../../images/travel/hotel.png" alt="" />
            <span>酒.景</span>
          </a>
          <a>
            <img src="../../images/travel/purpose.png" alt="" />
            <span>目的的参团</span>
          </a>
          <a>
            <img src="../../images/travel/travel-around.png" alt="" />
            <span>周边游</span>
          </a>
          <a>
            <img src="../../images/travel/island.png" alt="" />
            <span>海岛游</span>
          </a>
          <a>
            <img src="../../images/travel/vacation.png" alt="" />
            <span>度假.酒店</span>
          </a>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="btn-list">
          <a>
            <img src="../../images/travel/visa.png" alt="" />
            <span>免签落地签</span>
          </a>
          <a>
            <img src="../../images/travel/theme.png" alt="" />
            <span>主题游</span>
          </a>
        </div>
      </van-swipe-item>
    </van-swipe>

    <div class="special">
      <span class="special-title">
        尾单特价
      </span>
      <ul class="special-content">
        <recommend-pro-list :list="specialList">
          <span slot="body" class="intro" slot-scope="obj">{{
            obj.description
          }}</span>
          <span slot="footer" class="type" slot-scope="obj">{{
            obj.category
          }}</span>
        </recommend-pro-list>
      </ul>
    </div>
    <div class="trip-products-list">
      <ul class="products-tabs">
        <li
          @click="getListByCategory(1)"
          :class="curCategory == 1 ? 'active' : ''"
        >
          境内游
        </li>
        <li
          @click="getListByCategory(2)"
          :class="curCategory == 2 ? 'active' : ''"
        >
          境外游
        </li>
        <li
          @click="getListByCategory(3)"
          :class="curCategory == 3 ? 'active' : ''"
        >
          更多
        </li>
      </ul>
      <product-list :list="curProList">
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
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Swipe, SwipeItem, Icon, Toast } from "vant";
import NavBar from "@/common/components/navBar.vue";
import ProductList from "./components/productList.vue";
import RecommendProList from "./components/recommendProList.vue";
Vue.use(Toast);
@Component({
  name: "Travel",
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Icon.name]: Icon,
    NavBar,
    ProductList,
    RecommendProList
  }
})
class travel extends Vue {
  proList = [
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
  ];

  curProList: Array<any> = [];

  specialList = [
    {
      id: "1",
      title: "希腊一地8日游",
      description:
        "广州往返，圣托里尼，蓝白世界，探索古雅典文明，B线春节班期升级悬崖酒店羊排餐卫城伊亚日落，C线特价雅典自由活动",
      category: "跟团游",
      priceUnit: "￥",
      priceNum: "8230",
      imgUrl: "/images/travel/special1.jpg"
    },
    {
      id: "2",
      title: "泰国8日游",
      description:
        "爸妈放心游/优选航班/泰段0购物0脱团/7晚五星酒店/日游沙美岛/舌尖美食/一次游三国/南京往返",
      category: "跟团游",
      priceUnit: "￥",
      priceNum: "5480",
      imgUrl: "/images/travel/special2.jpg"
    }
  ];

  curCategory = 1;

  created() {
    this.curProList = this.proList.filter(item => item.category == "1");
  }

  searchPanelByCategory() {
    this.$router.push("/searchPanelByCategory");
  }

  //根据类别显示数据
  getListByCategory(curNum: number) {
    this.curCategory = curNum;
    switch (curNum) {
      case 1:
        this.curProList = this.proList.filter(item => item.category == "1");
        break;
      case 2:
        this.curProList = this.proList.filter(item => item.category == "0");
        break;
      case 3:
        Toast("正在建设中");
        break;
    }
  }
}

export default travel;
</script>

<style lang="scss" scoped>
a {
  color: #000;
}
.travel-layout {
  background-color: #f0f0f0;
  .nav-search {
    flex: none;
    width: 16rem;
  }
  .van-swipe {
    padding-bottom: 1rem;
    height: 12rem;
    padding-top: 50px;
    background-color: #fff;
    .btn-list {
      display: flex;
      flex-flow: row wrap;
      font-size: 0.8rem;
      text-align: center;
      a {
        margin-top: 1.2rem;
        width: 25%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        img {
          width: 3rem;
          margin-bottom: 0.3rem;
        }
      }
    }
  }

  .special {
    background-color: #fff;
    margin-top: 10px;
    .special-title {
      display: block;
      font-size: 1rem;
      padding: 0.5rem 0 0.5rem 1rem;
      color: #333;
      border-bottom: 1px solid #eee;
      height: 1.5rem;
      position: relative;
      &::before {
        content: "";
        background-color: #9ed969;
        position: absolute;
        width: 5px;
        height: 2.5rem;
        left: 0;
        top: 0;
      }
    }
  }

  .trip-products-list {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    margin-top: 10px;
    .products-tabs {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-around;
      align-items: center;
      font-size: 1rem;
      width: 100%;
      height: 2.8rem;
      line-height: 2.8rem;
      .active {
        border-bottom: 2px solid #33bd61;
        color: #33bd61;
      }
    }
  }
}
// 插件部分
.products-list {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  margin-top: 10px;
  width: 100%;
  align-items: initial;

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
}

.intro {
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2; /*控制文本行数，多少行以后开始省略号 */
  line-clamp: 2;
  -webkit-box-orient: vertical;
  color: #999;
}

.type {
  color: #999;
  flex: 1;
}
</style>
