enum configEnums {
  //#region 条件导航
  //推荐条件
  recommendList = "recommendList",
  //日期条件
  dateList = "dateList",
  //天数
  dateNumList = "dateNumList",
  //出游日期
  travelTimeList = "travelTimeList",
  //特色玩乐分类
  specialList = "specialList",
  //#endregion

  //#region localstorage存储的key
  //搜索历史缓存的key
  searchKey = "searchKey",
  //Token的Key
  tokenKey = "apiToken",
  //用户信息的key
  uKey = "uKey",
  //登陆之前的页面缓存起来
  redirectUrlKey="redirectUrlKey",
  //#endregion

//#region websocket url
websocketUrl="ws://localhost:8082"
//#endregion

}

export default configEnums;
