<template>
    <i class="go-top" @click="goTop"></i>
</template>

<style lang="scss" scoped>
    .go-top{
    background: #fff;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    position: fixed;
    box-shadow: 0 2px 4px #ddd;
    bottom: 20%;
    right: 1%;
    z-index: 99;
    &::after{
      content: '';
      background: url('/images/common/go-top.png') no-repeat;
      transform: scale(0.7);
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-position: -13px -12px;
    }
  }
</style>

<script lang="ts">
import { Vue } from "vue-property-decorator";
export default Vue.extend({
    name:'TopIcon',
    methods: {
        goTop(){
            document.documentElement.scrollTop=0
        }
    },
})
</script>