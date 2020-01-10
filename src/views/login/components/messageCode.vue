<template>
  <div>
    <h1 class="login-title">
      手机号快速登录
    </h1>
    <section>
      <ul class="login-form">
        <li>
          <van-field maxlength="11" placeholder="国内手机号码" />
        </li>
        <li>
          <van-cell-group>
            <van-field center clearable placeholder="短信动态码">
              <van-button slot="button" size="small" type="primary"
                >发送动态码</van-button
              >
            </van-field>
          </van-cell-group>
        </li>
      </ul>
    </section>
    <p class="explain">未注册手机验证后即完成注册</p>
    <section class="btn-primary">
      <van-button type="primary" size="large">登录</van-button>
      <p class="switch-panel" @click="GoToAccount">账号密码登录</p>
    </section>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";
import { Field, Button, CellGroup } from "vant";
@Component({
  name: "MessageCode",
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup
  }
})
class MessageCode extends Vue {
  GoToAccount() {
    this.SetPanel();
  }

  @Emit("SetPanel")
  SetPanel() {
    return "Account";
  }
}

export default MessageCode;
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
.explain {
  margin: 15px 20px 0 20px;
  color: #999;
  font-size: 13px;
}
.btn-primary {
  margin: 30px 20px;

  .switch-panel {
    margin-bottom: 0;
  }
}
</style>
