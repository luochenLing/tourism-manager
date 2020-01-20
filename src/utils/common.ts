
class common {
  //只有一天的存储器
  static GetLocalStorage(key: string) {
    let exp = 60 * 60 * 24; // 一天的秒数
    let vals = localStorage.getItem(key);
    if (vals) {
      let dataObj = JSON.parse(vals); // 将字符串转换成JSON对象
      // 如果(当前时间 - 存储的元素在创建时候设置的时间) > 过期时间
      let isTimed = new Date().getTime() - new Date(dataObj.timer).getTime() > exp;
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
