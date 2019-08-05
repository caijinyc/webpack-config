const path = require('path');
const merge = require('webpack-merge');
const { HotModuleReplacementPlugin } = require('webpack');
const common = require('./common');

module.exports = merge(common, {
    mode: 'development',

    devtool: 'cheap-module-eval-source-map',  // development
    // devtool: 'source-map',   production
    // cheap 这告诉我们行数，不用告诉我们出错的列，生产环境可以使用 source-map
    // eval 用 eval 生成报错信息

    devServer: {
        port: 1234,
        open: true,
        contentBase: path.resolve(__dirname, '../dist'),
        hot: true, // 模块热更新
        // hotOnly: true,

        // 利用 webpack-dev-server 进行代理
        // https://webpack.js.org/configuration/dev-server/#devserverproxy
        proxy: {
            '/react/api': 'http://www.cdn.com',

            'react/api2': {
                target: 'http://www.cdn.com',
                // secure: false,  // 对 https 网站的代理需要设置
                pathRewrite: {
                    'header.json': 'demo.json',   // 请求 header.json 文件时 代理到 请求 demo.json
                },
            },
        },
    },

    plugins: [
        new HotModuleReplacementPlugin(),
    ],
});
