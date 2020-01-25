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
  static async GetTravelInfoListByProType(
    proType: number,
    pageSize: number = 10,
    pageIndex: number = 1
  ) {
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
  static async GetTravelInfoListByFrontier(
    frontier: number,
    pageSize: number = 10,
    pageIndex: number = 1
  ) {
    let token;
    await ApiService.GetApiToken().then(ret => {
      token = ret;
    });

    let url = `/api/TravelInfo/GetTravelInfoListByFrontierAsync?frontier=${frontier}&pageSize=${pageSize}&pageIndex=${pageIndex}`;
    return await request.post(token, url);
  }

  /**根据地名查找商品列表*/
  static async GetTravelListByArea(
    areaName: string,
    pageSize: number = 10,
    pageIndex: number = 1
  ) {
    let token;
    await ApiService.GetApiToken().then(ret => {
      token = ret;
    });
    let url = `/api/TravelInfo/GetTravelListByAreaAsync?areaName=${areaName}&pageSize=${pageSize}&pageIndex=${pageIndex}`;

    return await request.post(token, url);
  }

  /**
   * 获取筛选条件
   */
  static async GetTravelConditionList() {
    let token;
    await ApiService.GetApiToken().then(ret => {
      token = ret;
    });
    let url = `/api/TravelInfo/GetTravelConditionListAsync`;
    return await request.get(token, url);
  }

  /**
   * 根据筛选条件获取列表
   */
  static async GetTravelInfoListByFilter(params: any) {
    let token;
    await ApiService.GetApiToken().then(ret => {
      token = ret;
    });
    let url = `/api/TravelInfo/GetTravelInfoListByFilterAsync`;
    params = JSON.stringify(params);
    return await request.post(token, url, params);
  }

  /**
   * 根据ID获取产品信息
   * @param proId 产品ID
   */
  static async GetTravelInfoById(proId:string){
    let token;
    await ApiService.GetApiToken().then(ret => {
      token = ret;
    });
    let url = `/api/TravelInfo/GetTravelInfoByIdAsync?proId=${proId}`;
    return await request.post(token, url);
  }

  /**
   * 根据产品ID查找媒体信息列表
   * @param proId 产品ID
   */
  static async GetMediaInfoListById(proId:string){
    let token;
    await ApiService.GetApiToken().then(ret => {
      token = ret;
    });
    let url = `/api/TravelInfo/GetMediaInfoListByIdAsync?proId=${proId}`;
    return await request.post(token, url);
  }

   /**
   * 根据用户ID获取优惠券列表
   * @param userId 产品ID
   */
  static async GetCouponListByUserId(userId:string){
    let token;
    await ApiService.GetApiToken().then(ret => {
      token = ret;
    });
    let url = `/api/TravelInfo/GetCouponListByUserIdAsync?userId=${userId}`;
    return await request.post(token, url);
  }

     /**
   * 根据产品ID获取产品活动列表
   * @param proId 产品ID
   */
  static async GetTravelActivityListByProId(proId:string){
    let token;
    await ApiService.GetApiToken().then(ret => {
      token = ret;
    });
    let url = `/api/TravelInfo/GetTravelActivityListByProIdAsync?proId=${proId}`;
    return await request.post(token, url);
  }

  static async RelatedProducts(areaName:string){
    let token;
    await ApiService.GetApiToken().then(ret => {
      token = ret;
    });
    let url = `/api/TravelInfo/RelatedProductsAsync?areaName=${areaName}`;
    return await request.post(token, url);
  }

}
export default TourismService;
