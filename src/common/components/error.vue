<template lang="">
  <div class="content">
    <nav-bar v-if="this.GetNavState()">
      <div slot="nav-center" class="title">
        {{this.GetErrorTitle()}}
      </div>
      <div slot="nav-right" class="right"></div>
    </nav-bar>
    <div
      class="err-content"
      :style="
        this.GetNavState() ? 'padding-top: 50px;height: calc(100vh - 50px)' : ''
      "
    >
      <img src="@/images/common/error.svg" />
      <section>
        {{ this.GetErrorText() }}
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import NavBar from "@/common/components/navBar.vue";
@Component({
  name: "Error",
  components: {
    NavBar
  }
})
class Error extends Vue {
  @Prop({ default: "", type: String }) text!: String;
  @Prop({ default: "出了点问题", type: String }) title?: String;
  @Prop({ type: Boolean }) showNav!: boolean;

  GetNavState() {
    let state = this.$route.query.showNav;
    if (state) {
      return state;
    }
    return this.showNav;
  }
  GetErrorText() {
    let text = this.$route.query.text;
    if (text) {
      return text;
    }
    return this.text;
  }
  GetErrorTitle() {
    // debugger
    let title = this.$route.query.title;
    if (title) {
      return title;
    }
    return this.title;
  }
}
export default Error;
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  .err-content {
    height: inherit;
    position: relative;
    img {
      position: relative;
      top: 40%;
      width: 100px;
      display: block;
      margin: 0 auto;
    }
    section {
      position: relative;
      top: 42%;
      color: #999;
      font-size: 18px;
      text-align: center;
    }
  }
}

.back {
  flex: 10%;
}
.title {
  flex: 80%;
  text-align: center;
  font-size: 16px;
}
.right {
  flex: 10%;
}
</style>
