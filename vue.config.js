const path = require('path');
module.exports = {
    devServer: {
        open: true,//自动打开浏览器
        port: 3000,//运行端口号
        contentBase: 'src',//指定跟目录
        hot: true,//启用热更新
        // openPage: 'index.html'//设置默认启动页面
    },
    css: {
        loaderOptions: { // 向 CSS 相关的 loader 传递选项
          less: {
            javascriptEnabled: true,
          }
        }
    },
    //添加VSCODE调试
    configureWebpack: {
      devtool: 'source-map',
    }
}