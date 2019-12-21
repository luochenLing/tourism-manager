<template>
  <ul>
      <li v-for="(item,index) in list" :key="index">
          
      </li>
  </ul>
</template>


<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Coupon",
  props: {
    list: {
      type: Array,
      default: []
    }
  }
});
</script>

<style lang="scss" scoped></style>
