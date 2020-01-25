<template>
  <ul class="condition-list">
    <li
      v-for="(item, index) in haveList(list)"
      :key="item.id"
      :data-code="item.code"
      :class="index == activeIndex ? 'active' : ''"
      @click="getSelect($event, index)"
    >
      {{ item.text }}
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.condition-list {
  padding: 32px 10px 0 10px;
  li {
    border-bottom: 1px solid #e9e9e9;
    line-height: 45px;
    font-size: 13px;
  }
  .active::after {
    content: "\F0C8";
    font: 24px/1 "vant-icon";
    float: right;
    line-height: 45px;
    color: #23cc77;
  }
}
</style>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { Toast } from "vant";
import configEnums from "@/globalConfig/configEmuns";
import TourismService from "@/services/tourismService";
import ErrorPage from "@/common/components/error.vue";
import common from "@/utils/common";
Vue.use(Toast);
@Component({
  name: "ClassicConditionList"
})
class classicConditionList extends Vue {
  @Prop({ default: [], type: Array }) list!: { recommendList: Array<any> };
  activeIndex = 0;
  params = {
    orderFiled: "",
    dateList: [],
    travelTimeList: [],
    specialList: []
  };

  @Emit("update:changeProList")
  changeProList(prolist: any[]) {
    return prolist;
  }

  @Emit("update:changePopup")
  changePopup(showPopup: boolean) {
    return showPopup;
  }

  //获取到当前选中项的值并且设置选中状态
  getSelect(e: any, index: number) {
    this.activeIndex = index;
    let obj = {
      text: e.target.innerText,
      code: e.target.dataset.code
    };
    this.$store.commit("travelFilterCondition/setCurRecommend", obj);
    this.params = this.getConditions(this.params);
    this.changePopup(false);
    this.GetTravelInfoListByFilter(this.params);
  }

  haveList(list: Array<any>) {
    if (list[0]) {
      return list[0].children;
    } else {
      return new Array();
    }
  }

  getConditions(params: any) {
    params.orderFiled = this.$store.getters[
      `travelFilterCondition/getCurRecommend`
    ].code;

    let dateList = this.$store.getters[`travelFilterCondition/getCurDateList`]
      .curDateNums;
    if (dateList) {
      params.dateList = dateList.map((val: any, idx: any) => {
        return val.code * 1;
      });
    }

    let travelTimeList = this.$store.getters[
      `travelFilterCondition/getCurDateList`
    ].curTravelTimes;
    if (travelTimeList) {
      params.travelTimeList = travelTimeList.map((val: any, idx: any) => {
        return val.code * 1;
      });
    }

    let specialList = this.$store.getters[
      `travelFilterCondition/getCurSpecialList`
    ].curSpecialList;
    if (specialList) {
      params.specialList = specialList.map((val: any, idx: any) => {
        return val.code * 1;
      });
    }
    return params;
  }

  GetTravelInfoListByFilter(params: any) {
     Toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0
      });
    TourismService.GetTravelInfoListByFilter(params)
      .then(ret => {
        Toast.clear();
        if (ret.data && ret.data.resultData) {
          this.changeProList(ret.data.resultData);
        }
      })
      .catch(err => {
        Toast.clear();
        let text = common.GetHttpCodeMsg(err.response.status);
        let url=`/error?showNav=true&text=${text}`
        this.$router.replace(url);
      });
  }
}

export default classicConditionList;
</script>
