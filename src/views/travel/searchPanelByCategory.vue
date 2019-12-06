<template lang="">
  <div class="search-layout">
    <NavBar class="search-banner">
      <div class="search-left" slot="nav-left">
        <van-icon name="wap-home-o" @click="goHome" size="30px" />
        <van-icon
          class="search-icon"
          @click="goSearch"
          name="search"
          size="30px"
        />
      </div>
      <span class="title" slot="nav-center">目的地大全</span>
      <span class="my" slot="nav-right">我的</span>
    </NavBar>
    <div class="pro-body">
      <div class="root" ref="navRoot">
        <ul
          class="left-nav"
          ref="leftNav"
          @touchstart="touchStart"
          @touchmove="touchMove"
        >
          <li
            :class="activeIndex == index ? 'avtice' : ''"
            v-for="(item, index) in navList"
            @click="getListByCategory(index)"
            :key="index"
          >
            {{ item.text }}
          </li>
        </ul>
      </div>
      <div
        class="right-count"
      >
        <product-list :list="proList"></product-list>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.search-layout {
  .van-sidebar-item--select {
    border-color: #23cc77;
  }
  .search-banner {
    justify-content: flex-start;
    .search-left {
      padding-left: 20px;
      .search-icon {
        padding-left: 10px;
      }
    }
    .title {
      font-size: 16px;
      margin: 0 auto;
    }
    .my {
      margin-right: 15px;
    }
  }

  .pro-body {
    padding-top: 50px;
  }
  /deep/ .products-list {
    .item-img {
      height: 6rem;
      img {
        width: 97%;
      }
    }
  }
}

.root {
  float: left;
  box-sizing: border-box;
  overflow: hidden;
  background: #f8f8f8;
}

.left-nav {
  background: #f3f2f5;
  width: 75px;
  user-select: none;
  transform: translateY(0) translateZ(0);
  li {
    list-style: none;
    text-align: center;
    font-size: 14px;
    color: #666;
    height: 42px;
    line-height: 42px;
    border-bottom: solid 1px #e9e9ea;
    position: relative;
  }
}

.right-count{
  margin-left:80px;
  overflow:auto;
}

.avtice {
  background: #fff;
  &::before {
    content: "";
    width: 3px;
    height: 42px;
    background: #23cc77;
    position: absolute;
    left: 0;
  }
}
</style>

<script lang="ts">
import NavBar from "@/common/components/navBar.vue";
import ProductList from "./components/productList.vue";
import { Vue } from "vue-property-decorator";
import { Image, Icon, CouponList } from "vant";

//const inobounce = require('inobounce');
export default Vue.extend({
  name: "searchPanelByCategory",
  components: {
    NavBar,
    [Image.name]: Image,
    [Icon.name]: Icon,
    ProductList
  },
  data() {
    return {
      activeIds: [1, 2],
      activeIndex: 0,
      startY: 0,
      elementY: 0,
      navList: [
        { text: "国内", id: "0100" },
        { text: "国外", id: "0200" },
        { text: "热门", id: "0300" },
        { text: "马尔代夫", id: "0400" },
        { text: "泰国", id: "0500" },
        { text: "国内1", id: "0100" },
        { text: "国外1", id: "0200" },
        { text: "热门1", id: "0300" },
        { text: "马尔代夫1", id: "0400" },
        { text: "泰国1", id: "0500" },
        { text: "国内2", id: "0100" },
        { text: "国外2", id: "0200" },
        { text: "热门2", id: "0300" },
        { text: "马尔代夫2", id: "0400" },
        { text: "泰国3", id: "0500" },
        { text: "国内3", id: "0100" },
        { text: "国外3", id: "0200" },
        { text: "热门3", id: "0300" },
        { text: "马尔代夫3", id: "0400" }
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
        },
        {
          id: "4",
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
        },
        {
          id: "5",
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
        },
        {
          id: "6",
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
  created() {
    // let u = navigator.userAgent;
    // if (u.indexOf("iPhone") > -1) {
    //inobounce.enable();
    //}
  },
  methods: {
    goHome() {
      this.$router.push("/home");
    },
    goSearch() {
      this.$router.push("/searchPanel");
    },
    getListByCategory(index: number) {
      this.activeIndex = index;
    },
    touchStart(e: any) {
      //如果使用e.preventDefault();会阻止li的点击事件，所以去掉
      let curElementY = (this.$refs.leftNav as any).style.transform || "0"; //获取当前需要CSS样式的DOM上现有CSS，没有就先写0
      this.startY = e.changedTouches[0].pageY; //记录当前点
      this.elementY = curElementY.match(/-{0,}\d+\.{0,}\d{0,}/); //获取translateY(-50px)中的-50
    },
    touchMove(e: any) {
      e.preventDefault(); //这里可以阻止touchMove时IOS出现的橡皮筋效果，安卓似乎也可以起到固定效果，待观察
      var touchY = e.changedTouches[0].pageY;
      let translateY = touchY - this.startY;
      let domStyle = (this.$refs.leftNav as any).style;
      let navRootHeight = (this.$refs.navRoot as any).offsetHeight;
      let domHeight = (this.$refs.leftNav as any).offsetHeight;
      //当到顶部的时候下拉禁止
      let y = Number((this.elementY as any)[0]) + translateY; //滑动的距离
      //头部到顶不动
      if (y >= 0) {
        domStyle.cssText = `transform: translateY(0);`;
        return;
      }
      //底部到底不动
      let overflowHeight = navRootHeight - domHeight;
      if (y <= overflowHeight) {
        domStyle.cssText = `transform: translateY(${overflowHeight}px);`;
        return;
      }
      domStyle.cssText = `transform: translateY(${y}px);`;
    }
  },
  mounted() {
    let height =
      document.documentElement.clientHeight -
      (document.querySelector(".search-banner") as any).offsetHeight;
    (document.querySelector(".root") as any).style.height = `${height}px`;
    (document.querySelector(
      ".right-count"
    ) as any).style.height = `${height}px`;
  },
  beforeDestroy() {
    //inobounce.disable();
  }
});
</script>
