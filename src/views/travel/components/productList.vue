<template>
  <ul class="products-list">
    <router-link
      to="/travel/travelInfo"
      class="products-item"
      v-for="item in list"
      :key="item.proId"
      tag="li"
    >
      <div class="item-img">
        <img :src="item.cover" alt="" :onerror='defaultImg'/>
        <slot name="img-info" :imgInfo="item"></slot>
      </div>
      <div class="item-content">
        <div class="item-title">{{ item.proTitle }}</div>
        <slot name="content-info" :contentInfo="item"></slot>
        <div class="item-des">{{ item.proDes }}</div>
      </div>
    </router-link>
  </ul>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Icon } from "vant";

@Component({
  name: "ProductList",
  components: {
    [Icon.name]: Icon
  }
})
class productList extends Vue {
  defaultImg= 'this.src="/images/common/defaultImg.svg";this.style="height: 100%;"';
  @Prop({ default: [], type: Array }) list!: Array<any>;
}
export default productList;
</script>

<style lang="scss" scoped>
a {
  color: #000;
}
.products-list {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  width: 100%;
  align-items: initial;
  .products-item {
    margin-top: 8px;
    .item-img {
      height: 9.5rem;
      overflow: hidden;
      position: relative;
      img {
        width: 100%;
        transform: translateY(-10%);
      }
    }
    .item-content {
      display: flex;
      flex-flow: column;
      padding: 0.5rem;
      justify-content: space-around;
      .item-title {
        font-size: 16px;
        margin-bottom: 5px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .item-tag {
        color: #999;
        margin-bottom: 5px;
        font-size: 13px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .item-des {
        color: #999;
        font-size: 13px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
}
</style>
