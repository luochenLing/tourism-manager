<template>
  <ul class="condition-list">
    <li
      v-for="(item, index) in list[0].children"
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
import configEnums from "@/globalConfig/configEmuns";
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({
  name: "ClassicConditionList"
})
class classicConditionList extends Vue {
  @Prop({ default: [], type: Array }) list!: {recommendList:Array<any>};
  activeIndex = 0;

  getList() {
    let recommendList = this.list.recommendList;
    return recommendList;
  }

  //获取到当前选中项的值并且设置选中状态
  getSelect(e: any, index: number) {
    this.activeIndex = index;
    let obj = {
      text: e.target.innerText,
      code: e.target.dataset.code
    };
    this.$store.commit("travelFilterCondition/setCurRecommend", obj);
  }
}

export default classicConditionList;
</script>
