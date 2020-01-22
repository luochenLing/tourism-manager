import request from "@/utils/request";
import ApiService from "@/services/apiService";
class TourismService {
  /**
   * 首页轮播图获取
   */
  static async GetSwpierList() {
    let token;
    await ApiService.GetApiToken().then(ret => {
      token = ret;
    });
    let url = "/api/TravelInfo/GetSwpierListAsync";
    return await request.get(token, url);
  }
  /**
   * 热门城市获取
   */
  static async GetHotCityList() {
    let token;
    await ApiService.GetApiToken().then(ret => {
      token = ret;
    });
    let url = "/api/TravelInfo/GetHotCityListAsync";
    return await request.get(token, url);
  }

  /**
   * 根据产品类型获取列表
   */
  static async GetTravelInfoListByProType(proType: number,pageSize:number=10,pageIndex:number=1) {
    let token;
    await ApiService.GetApiToken().then(ret => {
      token = ret;
    });

    let url = `/api/TravelInfo/GetTravelInfoListByProTypeAsync?proType=${proType}&pageSize=${pageSize}&pageIndex=${pageIndex}`;
    return await request.post(token, url);
  }

  /**
   * 根据国境标识获取产品列表
   */
  static async GetTravelInfoListByFrontier(frontier: number,pageSize:number=10,pageIndex:number=1) {
    let token;
    await ApiService.GetApiToken().then(ret => {
      token = ret;
    });

    let url = `/api/TravelInfo/GetTravelInfoListByFrontierAsync?frontier=${frontier}&pageSize=${pageSize}&pageIndex=${pageIndex}`;
    return await request.post(token, url);
  }

  /**根据地名查找商品列表*/
  static async GetTravelListByArea(areaName: string,pageSize:number=10,pageIndex:number=1
    ) {
    let token;
    await ApiService.GetApiToken().then(ret => {
      token = ret;
    });
    let url = `/api/TravelInfo/GetTravelListByAreaAsync?areaName=${areaName}&pageSize=${pageSize}&pageIndex=${pageIndex}`;
    
    return await request.post(token, url);
  }
}
export default TourismService;
