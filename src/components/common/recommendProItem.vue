<template>
   <li class="special-item">
        <img :src="info.imgUrl" />
        <h3>{{info.title}}</h3>
        <slot name="body"></slot>
        <div class="infos">
            <slot name="footer"></slot>
            <em class="unit">{{info.priceUnit}}</em>
            <em class="price">{{info.priceNum}}</em>
            <span class="discribe">起/人</span>
        </div>
    </li>
</template>
<script lang="ts">
    export default {
        name:"RecommendProItem",
        props:{
            info:{
                type:Object,
                default:{}
            }
        }
    }
</script>

<style lang="scss" scoped>

.special-item {
  flex-basis: 45%;
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


  img {
    width: 100%;
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

</style>