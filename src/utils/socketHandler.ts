const isProd=process.env.NODE_ENV==='production';
if(!isProd){
  var Cookies =require("js-cookie");
}

(window as any).ws=null;
class SocketHandler {
  static _url='';
  static InitSocket(url:string) {
    SocketHandler._url=url;
    this.reconnect();
  }

  static onOpen(callBack:Function){
    this.reconnect();
    (window as any).ws.onopen=(e:any)=>{
      callBack(e);
    };
  }

  static onMessage(callBack:Function){
    this.reconnect();
    (window as any).ws.onmessage=(e:any)=>{
      callBack(e);
    };
  }

  static onError(callBack:Function){
    this.reconnect();
    (window as any).ws.onerror=(e:any)=>{
      callBack(e);
    };
  }

  static sendMsg(sendObj: any,callBack:Function) {
    try {
      this.reconnect();
      (window as any).ws.send(JSON.stringify(sendObj));
      callBack();
    } catch (error) {
      console.log(error);
    }
  }

  static onClose(callBack:Function){
    this.reconnect();
    (window as any).ws.onclose=(e:any)=>{
      callBack(e);
    };
  }

  static closeWs(){
    (window as any).ws.close();
  }
  
  private static reconnect():void{
    if (!(window as any).ws){
      if(!SocketHandler._url){
        let uid = Cookies.get("uid");
        SocketHandler._url=`/ws?uid=${uid}`;
      }

      (window as any).ws = new WebSocket(SocketHandler._url);
    }
    else if ((window as any).ws.readyState == 3) {
      (window as any).ws = new WebSocket(SocketHandler._url);
    }
  }
}

export default SocketHandler;
