import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import CustomerService from "@/services/customerService";
import configEnums from "./globalConfig/configEmuns";
const isProd = process.env.NODE_ENV === "production";
if (!isProd) {
  //如果是开发环境，配置一个vuex的调试工具
  Vue.config.devtools = true;
}
const FastClick = require("fastclick");
// 开发环境下，Vue 会提供很多警告来帮你对付常见的错误与陷阱。而在生产环境下，这些警告语句却没有用，反而会增加应用的体积。此外，有些警告检查还有一些小的运行时开销，这在生产环境模式下是可以避免的。(摘于官网说明) 大概意思应该就是，消息提示的环境配置，设置为开发环境或者生产环境
Vue.config.productionTip = false;
FastClick.attach(document.body);
router.beforeEach(async (to, from, next) => {
  if (to.meta.requireAuth) {
    let result = false;
    await CustomerService.CheckUserIdentity().then(ret => {
      result = ret.data.resultData;
    });

    if (result) {
      next();
    } else {
      localStorage.setItem(configEnums.redirectUrlKey, to.fullPath);
      next({
        path: "/login"
      });
    }
  }
  next();
});
new Vue({
  created: function() {},
  router,
  store,
  render: h => h(App)
}).$mount("#app");
