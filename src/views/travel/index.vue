<template>
  <div class="travel-layout">
    <nav-bar>
      <div slot="nav-center" @click="searchPanelByCategory" class="nav-search">
        搜索目的地
      </div>
      <div slot="nav-right" class="nav-my-info">
        <router-link to="/personalCenter" class="my">我的</router-link>
      </div>
    </nav-bar>
    <vue-element-loading
      :active="loading"
      background-color="#f0f0f0"
      :is-full-screen="true"
    >
      <img src="@/images/common/loading.gif" alt="" v-if="loading" />
    </vue-element-loading>
    <van-swipe :loop="false" :stop-propagation="false">
      <van-swipe-item>
        <div class="btn-list">
          <router-link to="/travel/travelList?proType=0">
            <img src="@/images/travel/tourist-group.png" alt="" />
            <span>跟团游</span>
          </router-link>
          <router-link to="/travel/travelList?proType=1">
            <img src="@/images/travel/free-travel.png" alt="" />
            <span>自由行</span>
          </router-link>
          <router-link to="/travel/travelList?proType=5">
            <img src="@/images/travel/cruise.png" alt="" />
            <span>游轮</span>
          </router-link>
          <router-link to="/travel/travelList?proType=3">
            <img src="@/images/travel/hotel.png" alt="" />
            <span>酒.景</span>
          </router-link>
          <router-link to="/travel/travelList?proType=5">
            <img src="@/images/travel/purpose.png" alt="" />
            <span>目的的参团</span>
          </router-link>
          <router-link to="/travel/travelList?proType=2">
            <img src="@/images/travel/travel-around.png" alt="" />
            <span>周边游</span>
          </router-link>
          <router-link to="/travel/travelList?proType=5">
            <img src="@/images/travel/island.png" alt="" />
            <span>海岛游</span>
          </router-link>
          <router-link to="/travel/travelList?proType=5">
            <img src="@/images/travel/vacation.png" alt="" />
            <span>度假.酒店</span>
          </router-link>
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
      <recommend-pro-list :list="specialList">
        <span slot="body" class="intro" slot-scope="obj">{{
          obj.description
        }}</span>
        <span slot="footer" class="type" slot-scope="obj">{{
          obj.category | getProTyle
        }}</span>
      </recommend-pro-list>
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
          <div class="product-addr">{{ obj.imgInfo.placeOfDeparture }}出发</div>
          <div class="product-price">
            <dfn>{{ obj.imgInfo.priceUint }}</dfn>
            <em class="price-num">{{ obj.imgInfo.proPrice }}</em>
            <span>起</span>
          </div>
          <div class="product-other-info">
            <div class="product-score">
              <van-icon name="like-o" />
              <em>{{ obj.imgInfo.proScore }}</em>
            </div>
            <em>{{ obj.imgInfo.pCount | million }}人出游</em>
          </div>
        </template>
        <template slot="content-info" slot-scope="obj">
          <div class="item-tag">{{ obj.contentInfo.proTag | getProTage }}</div>
        </template>
      </product-list>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Swipe, SwipeItem, Icon, Toast } from "vant";
var VueElementLoading = require("vue-element-loading");
import NavBar from "@/common/components/navBar.vue";
import ProductList from "./components/productList.vue";
import RecommendProList from "./components/recommendProList.vue";
import TourismService from "@/services/tourismService";
import proTypeEnums from "@/globalConfig/proTypeEnums";
import frontierEnums from "@/globalConfig/frontierEnums";
import ErrorPage from "@/common/components/error.vue";
import common from "@/utils/common";
import proMixin from "@/views/travel/mixins/proMixin";
Vue.use(Toast);
@Component({
  name: "Travel",
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Icon.name]: Icon,
    VueElementLoading,
    'nav-bar':()=>import('@/common/components/navBar.vue'),
    'nav-list':()=>import('@/common/components/navList.vue'),
    'product-list':()=>import('./components/productList.vue'),
    'recommend-pro-list':()=>import('./components/recommendProList.vue')
  },
  filters: {
    getProTyle: (val: string) => {
      if (val) {
        let valArr = val.split("|");
        let proTypeArr: any[] = [];
        valArr.forEach((val, index) => {
          let ret = common.getProTypeByCode(parseInt(val));
          proTypeArr.push(ret);
        });
        return proTypeArr.join("|");
      }
    }
  }
})
class travel extends proMixin {
  loading: boolean = true;

  curProList: Array<any> = [];

  specialList = [];

  curCategory = 1;

  pageIndex = 1;
  pageSize = 10;

  created() {
    this.getData();
  }

  getData() {
    Promise.all([
      this.getSpecialOfferList(),
      this.getTravelInfoListByFrontier(
        frontierEnums.territory,
        this.pageSize,
        this.pageIndex
      )
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

  /**
   * 尾单特价
   */
  getSpecialOfferList() {
    TourismService.GetTravelInfoListByProType(proTypeEnums.specialOffer).then(
      (ret: any) => {
        if (ret.data) {
          this.specialList = ret.data.resultData;
        }
      }
    );
  }

  /**
   * 境内/境外数据
   */
  getTravelInfoListByFrontier(
    frontier: number = frontierEnums.territory,
    pageSize: number,
    pageIndex: number
  ) {
    TourismService.GetTravelInfoListByFrontier(
      frontier,
      pageSize,
      pageIndex
    ).then((ret: any) => {
      if (ret.data) {
        this.curProList = ret.data.resultData;
      }
    });
  }

  /**
   * 更多分类查询
   */
  searchPanelByCategory() {
    this.$router.push("/searchPanelByCategory");
  }

  //根据类别显示数据
  getListByCategory(curNum: number) {
    this.curCategory = curNum;
    this.pageIndex = 1;
    this.pageSize = 10;
    switch (curNum) {
      case 1:
        this.getTravelInfoListByFrontier(
          frontierEnums.territory,
          this.pageSize,
          this.pageIndex
        );
        break;
      case 2:
        this.getTravelInfoListByFrontier(
          frontierEnums.abroad,
          this.pageSize,
          this.pageIndex
        );
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
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
