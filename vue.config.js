const webpack = require("webpack");
module.exports = {
    // 调整 webpack 配置最简单的方式就是在 vue.config.js中的configureWebpack选项提供一个对象
    //webpack ProvidePlugin创建一个全局变量，在webpack各个模块内都可以使用。
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery', // 创建 '$'、'jQuery'、'window.jQuery' 三个变量指向依赖jquery
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                Popper: ['popper.js', 'default'] // 创建 'Popper' 变量指向依赖popper.js。
            })
        ]
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8088',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}