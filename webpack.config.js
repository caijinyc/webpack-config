const path = require('path');

module.exports = {
    entry: './index.js',
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash].[ext]',
                        output: 'img/'
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
                /**
                 * style-loader: 把 CSS 文件挂载到页面上
                 * css-loader: 分析几个 CSS 文件，然后合并成一个文件
                 * */
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            // 在 scss 文件中通过 import 引入其他的 css 文件时，先运行面两个 loader

                            modules: true,
                            // css modules 模块化的 css
                        }
                    },
                    'sass-loader',
                    'postcss-loader',
                ]
                /**
                 * loader 的执行顺序：从下到上，从右到左
                 */
            }
        ]
    }
};