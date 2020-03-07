//const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isProduction = process.env.NODE_ENV === "production";
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
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
    // config.plugins.push(
    //   new MiniCssExtractPlugin({
    //     ignoreOrder:true
    //   })
    // )
    //公共JS提取splitChunksPlugin
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: "all",//什么情况下提取，默认async异步资源，
            test: /node_modules/,
            name: "vendor",//提取后是什么名字
            minChunks: 1,//调用过几次就会触发提取
            maxInitialRequests: 5,//最大并发请求数
            minSize: 0,//小于指定值得时候不错代码分割
            priority: 0//优先级
          },
          common: {
            chunks: "all",
            test: /src[\\/](globalConfig|services|utils)[\\/].+\.(t|j)s/,
            name: "common",
            minChunks: 1,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 1
          },
          runtimeChunk: {
            name: "manifest"//当web请求资源的时候，要从这个生成的文件中找对应的代码去执行
          }
        }
      }
    };
    config.plugins.push(new BundleAnalyzerPlugin());

    config.plugins.push(new CompressionWebpackPlugin({
      algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,//大于XX就压缩
        minRatio: 0.8//压缩系数，默认0.8
    }));
    
  },
  chainWebpack:config=>{
    config.plugins.delete('prefetch');
  }
  //publicPath:'/'
};
