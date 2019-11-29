<template>
  <li class="products-item">
    <div class="item-img">
      <img :src="proInfo.imgUrl" alt="" />
      <slot name="img-info"></slot>
    </div>
    <div class="item-content">
      <div class="item-title">{{ proInfo.title }}</div>
      <slot name="content-info"></slot>
      <div class="item-des">{{ proInfo.description }}</div>
    </div>
  </li>
</template>
<script lang="ts">
import { Icon } from "vant";
export default {
  name: "ProductItem",
  props: {
    proInfo: {
      type: Object,
      default: {}
    }
  },
  components: {
    [Icon.name]: Icon
  }
};
</script>

<style lang="scss" scoped>
    .products-item{
        margin-top: 8px;
        .item-img{
            height: 9.5rem;
            overflow: hidden;
            position: relative;
            img{
                width: 100%;
                transform: translateY(-10%);
            }
        }
        .item-content{
            display: flex;
            flex-flow: column;
            padding: 0.5rem;
            justify-content: space-around;
            .item-title{
                font-size: 16px;
                margin-bottom: 5px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
            .item-tag{
                color: #999;
                margin-bottom: 5px;
                font-size:13px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
            .item-des{
                color: #999;
                font-size:13px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
        }
    }
</style>
