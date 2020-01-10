<template>
  <ul class="activity-list">
    <li class="activity-item" v-for="(item, index) in list" :key="index">
      <strong>[{{ item.tag }}]{{ item.title }}</strong>
      <div>
        活动时间:{{ item.startTime | timeFormat }}-{{
          item.endTime | timeFormat
        }}
      </div>
      <article class="content">{{ item.explain }}</article>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import timeMinxin from "@/views/travel/mixins/timeMixin";
@Component({
  name: "Activity"
})
class activity extends timeMinxin {
  @Prop({ default: [], type: Array }) list!: [];
}
export default activity;
</script>

<style lang="scss" scoped>
.activity-list {
  padding: 0 25px 20px 25px;
  overflow-y: auto;
  height: calc(100% - 40px);
  box-sizing: border-box;
  .activity-item {
    list-style: disc;
    line-height: 20px;
    .content {
      color: #999;
    }
  }
}
</style>
