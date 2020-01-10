<template>
  <div class="layout">
    <NavBar>
      <div class="nav-center" slot="nav-center"></div>
      <div class="nav-right" slot="nav-right">
        <!-- <h4>注册</h4> -->
      </div>
    </NavBar>
    <section :is="showPanel" @SetPanel="SetPanel"></section>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Field, Button, CellGroup } from "vant";
import NavBar from "@/common/components/navBar.vue";
import MessageCode from "./components/messageCode.vue";
import Account from "./components/account.vue";
@Component({
  name: "Login",
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    NavBar,
    MessageCode,
    Account
  }
})
class Login extends Vue {
  showPanel: string = "MessageCode";

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
