const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  devServer: {
    proxy: {
      "/connect/token": {
        target: "http://192.168.150.129:8080"
        //ws: true,//如果要代理 websockets，配置这个参数
        //changeOrigin: true //是否跨域
      },
      "/api": {
        target: "http://192.168.150.129:8081"
        //ws: true,
        //changeOrigin: true
      },
      "/ws": {
        target: "ws://192.168.150.129:8083",
        ws: true
        //changeOrigin: true
      }
    },

    open: true, //自动打开浏览器
    port: 3000, //运行端口号
    contentBase: "src", //指定跟目录
    hot: true, //启用热更新
    // openPage: 'index.html'//设置默认启动页面
    historyApiFallback: true
  },
  css: {
    loaderOptions: {
      // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true
      }
    }
  },
  //添加VSCODE调试
  configureWebpack: config => {
    config.devtool = "source-map";
    if (isProduction) {
      config.externals = {
        vue: "Vue",
        "vue-router": "VueRouter",
        vuex: "Vuex",
        axios: "axios",
        vant: "vant"
      };
    }
  }
  //publicPath:'/'
};
