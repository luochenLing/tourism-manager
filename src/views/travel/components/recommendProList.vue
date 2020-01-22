<template>
  <ul class="special-list">
    <li class="special-item" v-for="item in list" :key="item.proId">
     <div class="img">
        <img :src="item.cover" :onerror='defaultImg'/>
      </div>
       <h3>{{ item.proTitle }}</h3>
      <slot :description="item.proDes" name="body"></slot>
      <div class="infos">
        <slot :category="item.proType" name="footer"></slot>
        <em class="unit">{{ item.priceUint }}</em>
        <em class="price">{{ item.proPrice }}</em>
        <span class="discribe">起/人</span>
      </div>
    </li>
  </ul>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({
  name: "RecommendProList"
})
class recommendProList extends Vue {
  defaultImg= 'this.src="/images/common/defaultImg.svg"';
  @Prop({ default: [], type: Array }) list!: Array<any>;
}

export default recommendProList;
</script>

<style lang="scss" scoped>
.special-list {
  display: flex;
  flex-flow: row nowrap;
  margin-top: 0.5rem;
  justify-content: space-evenly;
  align-items: center;
  .special-item {
    width: 50%;
    padding: 5px;
    overflow: hidden;
    h3 {
      font-size: 12px;
      font-weight: 500;
      height: 1.5rem;
      line-height: 1.5rem;
      margin: 0;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    .img {
      img{
        width: 100%;
        height: 90px;
      }
    }

    .infos {
      margin-top: 0.5rem;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: flex-end;
      margin-bottom: 1.5rem;
      .unit {
        font-style: normal;
        font-size: 10px;
        color: #f60;
      }
      .price {
        font-style: normal;
        color: #f60;
        font-size: 17px;
        line-height: 17px;
        font-weight: 600;
      }
      .discribe {
        color: #999;
        padding-left: 5px;
      }
    }
  }
}
</style>
