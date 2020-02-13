<template>
  <div class="travel-list-layout">
    <nav-bar>
      <div slot="nav-center" @click="getSearch" class="nav-search">
        搜索目的地
      </div>
      <div slot="nav-right" class="address">杭州</div>
    </nav-bar>
    <vue-element-loading
      :active="loading"
      background-color="#f0f0f0"
      :is-full-screen="true"
    >
      <img src="@/images/common/loading.gif" alt="" v-if="loading" />
    </vue-element-loading>
    <div class="travel-content">
      <nav-condition
        :list="conditionList"
        :changePopup.sync="showConditionPopup"
        :changeCode.sync="curTitleCode"
      />
      <van-popup
        class="card-popup"
        v-model="showConditionPopup"
        position="bottom"
        round
        closeable
      >
        <card-list
          v-show="isDateOrSpecialList"
          :changePopup.sync="showConditionPopup"
          :changeProList.sync="proList"
          :list="getList()"
        />
        <classic-condition-list
          v-show="isRecommendList"
          :changePopup.sync="showConditionPopup"
          :changeProList.sync="proList"
          :list="getList()"
        />
      </van-popup>
      <div class="travel-list">
        <product-list :list="proList" v-show="proList.length>0">
          <template slot="img-info" slot-scope="obj">
            <div class="product-addr">
              {{ obj.imgInfo.placeOfDeparture }}出发
            </div>
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
              <em>{{ obj.imgInfo.proPCount | million }}人出游</em>
            </div>
          </template>
          <template slot="content-info" slot-scope="obj">
            <div class="item-tag">
              {{ obj.contentInfo.proTag | getProTage }}
            </div>
          </template>
        </product-list>
        <error-page
          v-show="proList.length <= 0"
          v-cloak
          :text="this.getErrorCode()"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Icon, Popup, Toast } from "vant";
var VueElementLoading = require("vue-element-loading");
import configEnums from "@/globalConfig/configEmuns";
import NavBar from "@/common/components/navBar.vue";
import ProductList from "./components/productList.vue";
import ClassicConditionList from "./components/condition/classicConditionList.vue";
import NavCondition from "./components/condition/navCondition.vue";
import CardList from "./components/condition/cardList.vue";
import TourismService from "@/services/tourismService";
import ErrorPage from "@/common/components/error.vue";
import common from "@/utils/common";
import proMixin from '@/views/travel/mixins/proMixin'
Vue.use(Toast);
@Component({
  name: "TravelList",
  components: {
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    VueElementLoading,
    NavBar,
    ProductList,
    ClassicConditionList,
    CardList,
    NavCondition,
    ErrorPage
  }
})
class travelList extends proMixin {
  conditionList: any[] = [];

  proList = [];

  showConditionPopup = false;

  curTitleCode = "";

  pageIndex = 1;
  pageSize = 10;

  loading = true;

  created() {
    this.getData();
  }

  beforeDestroy() {
    Toast.clear();  
  }

  /**
   * 获得数据
   */
  getData() {
    this.GetTravelConditionList();
    let { areaName, proType } = this.$route.query;
    if (areaName) {
      this.GetTravelListByArea(
        areaName as string,
        this.pageSize,
        this.pageIndex
      );
    } else if (proType) {
      this.GetTravelInfoListByProType(
        proType as any,
        this.pageSize,
        this.pageIndex
      );
    }
  }

  get isRecommendList(): any {
    return this.curTitleCode == configEnums.recommendList;
  }

  get isDateOrSpecialList() {
    let code = this.curTitleCode;
    return code == configEnums.dateList || code == configEnums.specialList;
  }

  getSearch() {
    this.$router.push("/searchPanel");
  }

  getList() {
    let code = this.curTitleCode;
    let list = this.conditionList.filter((item: any) => item.code == code);
    return list;
  }

  getErrorCode() {
    return common.GetHttpCodeMsg(-1);
  }

  /**根据产品类型获取产品列表*/
  GetTravelInfoListByProType(
    proType: number,
    pageSize: number,
    pageIndex: number
  ) {
    // debugger
    if (!this.loading) {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0
      });
    }
    TourismService.GetTravelInfoListByProType(
      proType,
      pageSize,
      pageIndex
    ).then(ret => {
      if (!this.loading) {
        Toast.clear();
      }
      this.loading = false;
      if (ret.data && ret.data.resultData) {
        this.proList = ret.data.resultData;
      }
      if (this.proList.length <= 0) {
        this.loading = false;
        let text = common.GetHttpCodeMsg(-1);
        let url = `/error?showNav=true&text=${text}&title=${text}`;
        this.$router.replace(url);
      }
    });
  }

  /**根据地名获取产品列表*/
  GetTravelListByArea(areaName: string, pageSize: number, pageIndex: number) {
    if (!this.loading) {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0
      });
    }
    TourismService.GetTravelListByArea(areaName, pageSize, pageIndex).then(
      ret => {
        if (!this.loading) {
          Toast.clear();
        }
        this.loading = false;
        if (ret.data && ret.data.resultData) {
          this.proList = ret.data.resultData;
        }
        if (this.proList.length <= 0) {
          this.loading = false;
          let text = common.GetHttpCodeMsg(-1);
          let url = `/error?showNav=true&text=${text}&title=${text}`;
          this.$router.replace(url);
        }
      }
    );
  }

  /**
   * 获取筛选条件
   */
  GetTravelConditionList() {
    TourismService.GetTravelConditionList().then(ret => {
      if (ret.data && ret.data.resultData) {
        let obj: Array<any> = ret.data.resultData.map(
          (val: any, index: any) => {
            let text = "",
              code = "",
              children = [];
            if (val.pType == 1 && val.typeCode == 1) {
              text = "计划天数";
              code = val.field;
              children = val.content.split("|").map((val: any, index: any) => {
                return { text: `${val}天`, code: val };
              });
            }
            if (val.pType == 1 && val.typeCode == 2) {
              text = "出行日期";
              code = val.field;
              children = val.content.split("|").map((val: any, index: any) => {
                return { text: `${val}月`, code: val };
              });
            }
            if (val.pType == 2 && val.typeCode == 1) {
              text = "特色推荐";
              code = val.field;
              children = val.content.split("|").map((val: any, index: any) => {
                return { text: this.getThemByCode(val * 1), code: val };
              });
            }
            if (val.pType == 0) {
              text = val.content;
              code = val.field;
              children = [];
            }
            return { text, code, children };
          }
        );
        let dateList = {
          text: "日期/计划",
          code: "dateList",
          children: []
        };
        let specialList = {
          text: "日期/计划",
          code: "specialList",
          children: []
        };
        let recommendList = {
          text: "推荐条件",
          code: "recommendList",
          children: []
        };
        obj.forEach((val: any, index: any) => {
          if (
            val.code == configEnums.dateNumList ||
            val.code == configEnums.travelTimeList
          ) {
            (<Array<any>>dateList.children).push(val);
          } else if (val.code == configEnums.specialList) {
            (<Array<any>>specialList.children).push(val);
          } else {
            (<Array<any>>recommendList.children).push(val);
          }
        });
        this.conditionList = [recommendList, dateList, specialList];
      }
    });
  }

  getThemByCode(code: number) {
    switch (code) {
      case 0:
        return "海洋乐园";
      case 1:
        return "温泉体验";
      case 2:
        return "浪漫海岛";
      case 3:
        return "野生动物园";
      case 4:
        return "人妖表演";
      case 5:
        return "峡谷冒险";
    }
  }
}
export default travelList;
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

    .card-popup {
      height: 80%;
    }

    .products-list {
      margin-top: 24px;
    }
  }
}
/deep/ .content{
  height: 60vh
}
</style>
