<template>
  <div>
    <h1 class="login-title">
      账号密码登录
    </h1>
    <section>
      <ul class="login-form">
        <li>
          <van-field placeholder="用户名/手机号/邮箱" v-model="account" />
        </li>
        <li>
          <van-cell-group>
            <van-field
              type="password"
              center
              clearable
              placeholder="密码"
              v-model="password"
            >
            </van-field>
          </van-cell-group>
        </li>
      </ul>
    </section>
    <section class="btn-primary">
      <van-button type="primary" size="large" @click="Login">登录</van-button>
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
import CustomerService from "@/services/customerService";
import configEnums from "@/globalConfig/configEmuns";

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
  account = "";
  password = "";
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

  setCurUserInfo(i: any) {}

  Login() {
    let account = this.account;
    let password = this.password;
    if (!account || !password) {
      Toast.fail("用户名或密码不为空");
      return;
    }

    // if (password.length < 6) {
    //   Toast.fail("密码长度不得小于6位数");
    //   return;
    // }
    Toast.loading({
      message: "正在登陆...",
      forbidClick: true,
      duration:0
    });
    let params = { CName: this.account, CPasswd: this.password };
    CustomerService.login(params).then((ret: any) => {
      Toast.clear();
      if (ret.data && ret.status==200) {
        this.$store.commit("userManager/setCurUserInfo", ret.data.resultData);
        let url = localStorage.getItem(configEnums.redirectUrlKey);
        if (url) {
          this.$router.replace(url);
        } else {
          this.$router.replace("/home");
        }
      }else {
        Toast.fail('账号或密码错误');
      }
    }).catch(err=>{
       Toast.fail('账号或密码错误');
    });
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
