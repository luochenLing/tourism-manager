<template>
  <ul class="condition">
    <li
      v-for="(item, index) in getConditionTitle()"
      :key="index"
      :data-title="item.text"
      :data-code="item.code"
      :class="index == activeIndex ? 'select-item' : 'unselect-item'"
      @click="setPopup"
    >
      {{ title(item) }}
    </li>
    <li class="unselect-item" @click="setPopup">更多筛选</li>
  </ul>
</template>

<style lang="scss" scoped>
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
    flex: 25%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
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
</style>

<script lang="ts">
import configEnums from "@/globalConfig/configEmuns";
import { CouponList } from "vant";

export default {
  props: {
    list: {
      default: []
    }
  },
  data() {
    return {
      curPopup: false, //当前popup弹框是否显示了
      activeIndex: 0
    };
  },
  computed: {
    title() {
      let curTitle: any;
      let $this: any = this;
      return (item: any) => {
        curTitle = item.text;
        switch (item.code) {
          case configEnums.recommendList:
            let recommend =
              $this.$store.getters["travelFilterCondition/getCurRecommend"];
            if (recommend&&recommend.text) {
              curTitle = recommend.text;
            }else{
              curTitle = item.text;
            }
            return curTitle;
          case configEnums.dateList:
            return curTitle;
          case configEnums.specialList:
            return curTitle;
        }
      };
    }
  },
  methods: {
    setPopup(e: any) {
      let $this: any = this;
      $this.curPopup = true;
      var obj = {
        text: e.target.dataset.title,
        code: e.target.dataset.code
      };
      $this.$store.commit("travelFilterCondition/setCurFilter", obj);
      $this.$store.commit("travelFilterCondition/setShowConditionPopup", true);
    },
    getConditionTitle(): any {
      let $this: any = this;
      let condisitonArray = [];
      for (let item of $this.list) {
        condisitonArray.push(item);
      }
      return condisitonArray;
    }
  }
};
</script>
