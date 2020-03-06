<template>
  <div class="layout">
    <nav-bar>
      <div class="nav-center" slot="nav-center"></div>
      <div class="nav-right" slot="nav-right">
        <!-- <h4>注册</h4> -->
      </div>
    </nav-bar>
    <section :is="showPanel" @SetPanel="SetPanel"></section>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Field, Button, CellGroup } from "vant";

@Component({
  name: "Login",
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    'nav-bar':()=>import('@/common/components/navBar.vue'),
    MessageCode:()=>import('./components/messageCode.vue'),
    Account:()=>import('./components/account.vue'),
  }
})
class Login extends Vue {
  showPanel: string = "message-code";

  SetPanel(showPanel: string) {
    this.showPanel = showPanel;
  }
}

export default Login;
</script>

<style lang="scss" scoped>
/deep/ .back {
  flex: 15%;
}

.nav-center {
  flex: 70%;
}

.nav-right {
  flex: 15%;
  color: #32c45d;
}
</style>
