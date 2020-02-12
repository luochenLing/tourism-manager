class Common {
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
      console.log("Error: 保存到本地存储失败");
    }
  }

  /**
   * 根据状态码返回具体错误信息
   * @param status httrp状态码
   */
  static GetHttpCodeMsg(status: number) {
    switch (status) {
      case -1:
        return "未找到数据";
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

  /**
   * 去除字符串头部空格或指定字符
   * @param str
   * @param c
   */

  static trimStart(str: string, c: string) {
    if (c == null || c == "") {
      var str = str.replace(/^s*/, "");
      return str;
    } else {
      var rg = new RegExp("^" + c + "*");
      var ret = str.replace(rg, "");
      return ret;
    }
  }

  /**
   * 去除字符串尾部空格或指定字符
   * @param str
   * @param c
   */

  static trimEnd(str: string, c: string) {
    if (c == null || c == "") {
      var rg = /s/;
      var i = str.length;
      while (rg.test(str.charAt(--i)));
      return str.slice(0, i + 1);
    } else {
      var rg = new RegExp(c);
      var i = str.length;
      while (rg.test(str.charAt(--i)));
      return str.slice(0, i + 1);
    }
  }

  static uncodeUtf16(str: string) {
    var reg = /\&#.*?;/g;
    var result = str.replace(reg, (char: any) => {
      var H, L, code;
      if (char.length == 9) {
        code = parseInt(char.match(/[0-9]+/g));
        H = Math.floor((code - 0x10000) / 0x400) + 0xd800;
        L = ((code - 0x10000) % 0x400) + 0xdc00;
        return unescape("%u" + H.toString(16) + "%u" + L.toString(16));
      } else {
        return char;
      }
    });
    return result;
  }

  /**
   * 表情转换为字符
   * @param str
   */
  static utf16toEntities(str: any) {
    var patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
    str = str.replace(patt, (char: any) => {
      var H, L, code;
      if (char.length === 2) {
        H = char.charCodeAt(0);
        // 取出高位
        L = char.charCodeAt(1);
        // 取出低位
        code = (H - 0xd800) * 0x400 + 0x10000 + L - 0xdc00;
        //转换算法
        return "&#" + code + ";";
      } else {
        return char;
      }
    });
    return str;
  }
}

export default Common;
