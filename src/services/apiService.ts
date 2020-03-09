import request from "@/utils/request";
import common from "@/utils/common";
import configEmuns from "@/globalConfig/configEmuns";

const Qs =require("qs");

class ApiService {
  static async GetApiToken() {
    //这里只写方法的controller和action他就会以当前网址的IP和端口自动补全，这里/connect/token和后面的地址名称是有对应的，所以会访问配置里对应KEY的代理配置
    let token = common.GetLocalStorage(configEmuns.tokenKey);
    if (!token) {
      let url = `/connect/token`;
      let obj = {
        client_id: "travel",
        client_secret: "tourism.travel",
        grant_type: "password",
        username: "tourismUser",
        password: "tourismPwd"
      };
      
      await request.post(url,false, Qs.stringify(obj,{ arrayFormat: 'brackets' }),'application/x-www-form-urlencoded').then(ret => {
        if (ret.data) {
          //查到数据后，存到localstorage中
          let curData = new Date();
          curData.setSeconds(curData.getSeconds() + ret.data.expires_in * 1);
          token = `${ret.data.token_type} ${ret.data.access_token}`;
          common.SetLocalStorage(configEmuns.tokenKey, token, curData);
        } else {
          token = null;
        }
      });
      return token;
    } else {
      return token;
    }
  }
}

export default ApiService;
