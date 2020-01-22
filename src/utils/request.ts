import axios from "axios";
import qs from "qs";

class request {
  static async post(header:any=null,url: string, params: any= null) {
    params = qs.stringify(params);
    if(header){
      axios.defaults.headers.common["Authorization"] = header;
    }
    return await axios.post(url, params);
  }

  static async get(header:any=null,url: string, params: any = null) {
    if(header){
      axios.defaults.headers.common["Authorization"] = header;
    }
    return await axios.get(url, params)
  }

  // static async postQuery(url: string, params: any= null,header:any=null) {
  //   if(header){
  //     axios.defaults.headers.common["Authorization"] = header;
  //   }
  //   return await axios.post(url);
  // }

}

export default request;
