<template>
  <div>
    <h1 class="login-title">
      账号密码登录
    </h1>
    <section>
      <ul class="login-form">
        <li>
          <van-field placeholder="用户名/手机号/邮箱" />
        </li>
        <li>
          <van-cell-group>
            <van-field type="password" center clearable placeholder="密码">
            </van-field>
          </van-cell-group>
        </li>
      </ul>
    </section>
    <section class="btn-primary">
      <van-button type="primary" size="large">登录</van-button>
      <div class="switch-panel">
        <p @click="GoToMsgCode">验证码登录</p>
        <p @click="ForgetOPwd">忘记密码?</p>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";
import { Field, Button, CellGroup, Toast } from "vant";
Vue.use(Toast);
@Component({
  name: "Account",
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup
  }
})
class Account extends Vue {
  @Emit("SetPanel")
  SetPanel() {
    return "MessageCode";
  }

  GoToMsgCode() {
    this.SetPanel();
  }

  ForgetOPwd() {
    Toast("正在建设中...");
  }
}

export default Account;
</script>

<style lang="scss" scoped>
.login-title {
  text-align: center;
  margin: 0;
  padding-top: 80px;
}

.login-form {
  margin: 50px 20px 0 20px;
  .van-cell:not(:last-child)::after {
    border-bottom: none;
  }
}

.btn-primary {
  margin: 30px 20px;
  .switch-panel {
    display: flex;
    justify-content: space-between;
  }
}
</style>
