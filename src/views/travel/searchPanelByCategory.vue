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
      <nav-list
        :subtractHeight="navHeight"
        :viewClientHeight="viewClientHeight"
      >
        <template slot="item">
          <li
            :class="activeIndex == index ? 'avtice' : ''"
            v-for="(item, index) in navList"
            @click.stop="getActive(index)"
            :key="index"
          >
            {{ item.text }}
          </li>
        </template>
      </nav-list>
      <div class="right-count">
        <product-list :list="proList"></product-list>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import NavBar from "@/common/components/navBar.vue";
import ProductList from "./components/productList.vue";
import NavList from "@/common/components/navList.vue";
import { Vue, Component } from "vue-property-decorator";
import { Image, Icon, CouponList } from "vant";

@Component({
  name: "SearchPanelByCategory",
  components: {
    NavBar,
    [Image.name]: Image,
    [Icon.name]: Icon,
    ProductList,
    NavList
  }
})
class searchPanelByCategory extends Vue {
  activeIndex = 0;
  //横向标题高度，
  navHeight = 50;

  viewClientHeight = 0;

  navList = [
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
    { text: "沙拉把你", id: "0400" },
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
  ];

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
  ];

  mounted() {
    this.navHeight = this.getDom(".search-banner")&&this.getDom(".search-banner").offsetHeight||0;
    let clientHeight = document.documentElement.clientHeight;
    this.viewClientHeight = clientHeight;
    let height = clientHeight - this.navHeight;
    this.getDom(".right-count").style.height = `${height}px`;
  }

  getDom(el: string): HTMLElement {
    return <HTMLElement>document.querySelector(el);
  }

  goHome() {
    this.$router.push("/home");
  }

  goSearch() {
    this.$router.push("/searchPanel");
  }

  getActive(index: number) {
    this.activeIndex = index;
  }
}
export default searchPanelByCategory;
</script>

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
  /deep/ .products-list {
    .item-img {
      height: 6rem;
      img {
        width: 97%;
      }
    }
  }
}

.right-count {
  margin-left: 80px;
  overflow: auto;
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
/deep/ .nav-class {
  background: #f3f2f5;
  width: 75px;
  user-select: none;
}
</style>
