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
    <vue-element-loading
      :active="loading"
      background-color="#f0f0f0"
      :is-full-screen="true"
    >
      <img src="@/images/common/loading.gif" alt="" v-if="loading" />
    </vue-element-loading>
    <div class="pro-body">
      <nav-list
        :subtractHeight="navHeight"
        :viewClientHeight="viewClientHeight"
      >
        <template slot="item">
          <li
            :class="activeIndex == index ? 'avtice' : ''"
            v-for="(item, index) in navList"
            @click.stop="getActive(index, item.text)"
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
import { Vue, Component } from "vue-property-decorator";
import { Image, Icon } from "vant";
var VueElementLoading = require("vue-element-loading");
import NavBar from "@/common/components/navBar.vue";
import ProductList from "./components/productList.vue";
import NavList from "@/common/components/navList.vue";
import TourismService from "@/services/tourismService";
@Component({
  name: "SearchPanelByCategory",
  components: {
    [Image.name]: Image,
    [Icon.name]: Icon,
    VueElementLoading,
    NavBar,
    ProductList,
    NavList
  }
})
class searchPanelByCategory extends Vue {
  activeIndex = 0;
  //横向标题高度，
  navHeight = 50;

  viewClientHeight = 0;

  loading = true;

  navList = [];

  proList = [];

  pageIndex = 1;
  pageSize = 10;

  created() {
    this.getData();
  }
  mounted() {
    this.navHeight =
      (this.getDom(".search-banner") &&
        this.getDom(".search-banner").offsetHeight) ||
      0;
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

  getActive(index: number, text: string) {
    this.activeIndex = index;
    this.pageIndex = 1;
    this.pageSize = 10;
    this.GetTravelListByArea(text, this.pageSize, this.pageIndex);
  }

  /**
   * 获取数据
   */
  getData() {
    this.getHotCityData()
      .then(ret => {
        this.pageIndex = 1;
        this.pageSize = 10;
        if (this.navList) {
          this.GetTravelListByArea(
            (<any>this.navList[0]).text,
            this.pageSize,
            this.pageIndex
          );
        }
      })
      .then(ret => {
        this.loading = false;
      })
      .catch(err => {});
  }

  /**热门城市获取*/
  async getHotCityData() {
    await TourismService.GetHotCityList().then(ret => {
      if (ret.data && ret.data.resultData) {
        this.navList = ret.data.resultData.map((val: any) => ({
          id: val._Id,
          text: val.title
        }));
      }
    });
  }

  /**根据地名获取产品列表*/
  GetTravelListByArea(areaName: string, pageSize: number, pageIndex: number) {
    TourismService.GetTravelListByArea(areaName, pageSize, pageIndex).then(
      ret => {
        if (ret.data) {
          this.proList = ret.data.resultData;
        }
      }
    );
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
      // height: 6rem;
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
