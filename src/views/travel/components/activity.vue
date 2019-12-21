<template>
  <ul>
      
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Activity",
  props: {
    list: {
      type: Array,
      default: []
    }
  }
});
</script>

<style lang="scss" scoped></style>
