<template>
  <ul class="products-list" >
    <router-link to="/travel/travelInfo" class="products-item" v-for="item in list" :key="item.id">
      <div class="item-img">
        <img :src="item.imgUrl" alt="" />
        <slot name="img-info" :imgInfo="item"></slot>
      </div>
      <div class="item-content">
        <div class="item-title">{{ item.title }}</div>
        <slot name="content-info" :contentInfo="item"></slot>
        <div class="item-des">{{ item.description }}</div>
      </div>
    </router-link>
  </ul>
</template>
<script lang="ts">
import { Icon } from "vant";
export default {
  name: "ProductList",
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  components: {
    [Icon.name]: Icon
  }
};
</script>

<style lang="scss" scoped>
.products-list {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  margin-top: 10px;
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
