const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV !== 'development';

module.exports = {
    entry: {
        home: path.resolve(__dirname, '../pages/home/index.tsx'),
    },

    output: {
        // contenthash 代码不变更，打包后的 hash 值就不会变
        filename: isProduction ? 'static/js/[name].[contenthash].js' : 'static/js/[name].js',
        chunkFilename: isProduction
            ? 'static/js/[name].[contenthash].chunk.js'
            : 'static/js/[name].chunk.js',
        path: path.resolve(__dirname, '../dist'),
        // publicPath: 'cdn.com.cn' // cdn 路径
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.tsx?$/,
                use: ['babel-loader', 'awesome-typescript-loader', 'eslint-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash].[ext]',
                        output: 'static/images/',
                    },
                },
            },
            {
                test: /\.(sc|sa|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: !isProduction,
                            reloadAll: true,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            // 在 scss 文件中通过 import 引入其他的 css 文件时，先运行面两个 loader

                            modules: true,
                            // css modules 模块化的 css
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
                /**
                 * loader 的执行顺序：从下到上，从右到左
                 * style-loader: 把 CSS 文件挂载到页面上
                 * css-loader: 分析几个 CSS 文件，然后合并成一个文件
                 */
            },
        ],
    },

    optimization: {
        /**
         * https://webpack.docschina.org/plugins/split-chunks-plugin/#optimization-splitchunks
         * code splitting 代码分割（webpack4 引入这种声明方式）
         * build 实现代码分割有两种方式：
         * 1. 同步代码：在 splitChunks 配置 all 即可
         * 2. 异步代码（import）：无需配置，会自动进行代码分隔
         */
        // usedExports: true,
        splitChunks: {
            chunks: 'all', // 对什么代码分隔？ all、async
            minSize: 30000, // 大于 30000bytes 30kb 才会进行分割
            maxSize: 0, // 进一步的代码分割 0 表示不分割
            minChunks: 1, // 一个模块至少被引用用了多少次，才会被分割
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '_',
            name: true,
            cacheGroups: {
                // 缓存组：把合适的模块打包在一起
                vendors: {
                    test: /[\\/]node_modules[\\/]/, // 引入的文件是否在 node modules 中
                    priority: -10, // 优先级
                    name: 'vendors',
                },
                default: {
                    // 非 node modules 中的文件会放在 default 中的文件中
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true, //  重复使用已经存在的模块
                },
            },
        },
    },

    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.json', '.scss', '.css'], // 自动解析文件扩展名，也就是不用输入 .js .ts ...等
        alias: {
            pages: path.resolve(__dirname, '../pages'),
            components: path.resolve(__dirname, '../components'),
            helper: path.resolve(__dirname, '../helper'),
            assets: path.resolve(__dirname, '../assets'),
            styles: path.resolve(__dirname, '../styles'),
        },
    },

    // plugin 可以在 build 运行到某个时刻的时候做一些事情
    plugins: [
        new CheckerPlugin(),
        new HtmlWebpackPlugin({
            filename: './html/home/index.html',
            template: path.resolve(__dirname, '../pages/home/index.html'),
            chunks: ['vendors', 'home'],
            hash: true,
        }),
        new MiniCssExtractPlugin({
            filename: isProduction
                ? './static/css/[name].[contenthash].css'
                : './static/css/[name].css',
            chunkFilename: isProduction ? '[id].[contenthash].css' : '[id].css',
            ignoreOrder: false,
        }),
    ],
};
