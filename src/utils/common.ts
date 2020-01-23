class common {
  //只有一天的存储器
  static GetLocalStorage(key: string) {
    let exp = 60 * 60 * 24; // 一天的秒数
    let vals = localStorage.getItem(key);
    if (vals) {
      let dataObj = JSON.parse(vals); // 将字符串转换成JSON对象
      // 如果(当前时间 - 存储的元素在创建时候设置的时间) > 过期时间
      let isTimed =
        new Date().getTime() - new Date(dataObj.timer).getTime() > exp;
      if (isTimed) {
        //console.log("存储已过期");
        localStorage.removeItem(key);
        return null;
      } else {
        let newValue = dataObj.val;
        return newValue;
      }
    } else {
      return null;
    }
  }

  //获取存储的cookie
  static SetLocalStorage(key: string, value: any, expires: Date = new Date()) {
    let valueDate = JSON.stringify({
      val: value,
      timer: expires
    });
    try {
      localStorage.setItem(key, valueDate);
    } catch (e) {
      // 兼容性写法
      if (this.prototype.IsQuotaExceeded(e)) {
        console.log("Error: 本地存储超过限制");
        //localStorage.clear();就算满了，也不能成为删除之前数据的理由
      } else {
        console.log("Error: 保存到本地存储失败");
      }
    }
  }

  /**
   * 根据状态码返回具体错误信息
   * @param status httrp状态码
   */
  static GetHttpCodeMsg(status: number) {
    switch (status) {
      case -1:
      return '未找到数据';
      case 401:
        return "没有权限";
      case 404:
        return "页面丢失了";
      case 500:
        return "服务器请求超时";
      default:
        return "未知错误！";
    }
  }

  /**
 * 匹配产品类型
 */
static getProTypeByCode(val: number) {
  switch (val) {
    case 0:
      return "跟团";
    case 1:
      return "自由行";
    case 2:
      return "周边";
    case 3:
      return "景点";
    case 4:
      return "尾单特价";
  }
}

/**
 * 匹配产品标签
 */
static getProTageByCode(val: number) {
  switch (val) {
    case 0:
      return "上门接";
    case 1:
      return "无自费";
    case 2:
      return "立减";
    case 3:
      return "成团保障";
    case 4:
      return "精致小团";
    case 5:
      return "优选";
  }
}

  private IsQuotaExceeded(e: any) {
    let quotaExceeded = false;
    if (e) {
      if (e.code) {
        switch (e.code) {
          case 22:
            quotaExceeded = true;
            break;
          case 1014: // Firefox
            if (e.name === "NS_ERROR_DOM_QUOTA_REACHED") {
              quotaExceeded = true;
            }
            break;
        }
      } else if (e.number === -2147024882) {
        // IE8
        quotaExceeded = true;
      }
    }
    return quotaExceeded;
  }
}

export default common;
