<template>
  <div id="app" class="layout" >
    <keep-alive>
      <transition>
        <router-view></router-view>
      </transition>
    </keep-alive>
  </div>
</template>
<script lang="ts">
  import { Vue } from "vue-property-decorator";
  export default Vue.extend({
    data() {
      return {}
    },
    created() {
        
    }
    ,
    watch: {
      // '$route' (to, from) {
      //   console.log(to)
      //   let toName = to.name
      //   console.log(from)
      //   const toIndex = to.meta.index
      //   const fromIndex = from.meta.index
      //   //this.transitionName = toIndex < fromIndex ? 'slide-right' : 'slide-left'
      // }
    }
})

</script>
<style lang="scss" scoped>
    *{
      font-size: 12px;
    }
</style>
