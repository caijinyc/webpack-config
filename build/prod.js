const merge = require('webpack-merge');

// 压缩 JS, CSS
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const common = require('./common');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'cheap-source-map',  // development
    optimization: {
        minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin({})],
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
});
