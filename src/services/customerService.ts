import request from "@/utils/request";
import ApiService from './apiService';
class CustomerService{
    static async login(params:any){
        let token;
        await ApiService.GetApiToken().then(ret => {
          token = ret;
        });
        let url = "/api/Customer/Login";
        return await request.post(token, url,params);
    }

    static async logOut(){
        let token;
        await ApiService.GetApiToken().then(ret => {
          token = ret;
        });
        let url = "/api/Customer/LogOut";
        return await request.post(token, url);
    }

    static async CheckUserIdentity(){
      let token;
      await ApiService.GetApiToken().then(ret => {
        token = ret;
      });
      let url = "/api/Customer/CheckUserIdentity";
      return await request.post(token, url);
  }

}

export default CustomerService