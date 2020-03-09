import axios, { AxiosRequestConfig } from "axios";
import apiServer from "../services/apiService";
class request {
  static async post(
    url: string,
    auth: any = true,
    params: any = null,
    contentType: string = "application/json;charset=UTF-8"
  ) {
    axios.defaults.headers.post["Content-Type"] = contentType;
    await this.prototype.setInterceptorsRequest(axios, auth);
    return await axios.post(url, params);
  }

  static async get(url: string, auth: any = true, params: any = null) {
    await this.prototype.setInterceptorsRequest(axios, auth);
    return await axios.get(url, params);
  }
  /**
   *
   * @param axios 设置拦截器拦截请求
   * @param auth
   */
  async setInterceptorsRequest(axios: any, auth: any = false) {
    var token: any = null;
    if (auth) {
      token = await apiServer.GetApiToken();
    }
    axios.interceptors.request.use(
      (request: AxiosRequestConfig) => {
        if (token) {
          request.headers.Authorization = token;
        }
        //console.log("request", request);
        return request;
      },
      (error: any) => {
        //console.log("error", error);
        return error;
      }
    );
  }

  // axios.interceptors.response.use((response)=>{
  //   console.log('response',response);
  //   return response;
  // })
}

export default request;
