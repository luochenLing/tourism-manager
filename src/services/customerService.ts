import request from "@/utils/request";
class CustomerService{
    static async login(params:any){
        let url = "/api/Customer/Login";
        return await request.post(url,true,params);
    }

    static async logOut(){
        let url = "/api/Customer/LogOut";
        return await request.post(url);
    }

    static async CheckUserIdentity(){
      let url = "/api/Customer/CheckUserIdentity";
      return await request.post(url);
  }

}

export default CustomerService