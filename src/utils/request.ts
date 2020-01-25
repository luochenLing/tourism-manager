import axios from "axios";

class request {
  static async post(header:any=null,url: string, params: any= null,contentType:string='application/json') {
    if(header){
      axios.defaults.headers.common["Authorization"] = header;
    }
    axios.defaults.headers.post['Content-Type'] = contentType;
    return await axios.post(url, params);
  }

  static async get(header:any=null,url: string, params: any = null) {
    if(header){
      axios.defaults.headers.common["Authorization"] = header;
    }
    return await axios.get(url, params)
  }
}

export default request;
