const path = require('path');

module.exports = {
    mode: 'production',
    entry: '../src/index.tsx',

    // 打包的时候忽略，避免别人引用我们的库的时候又引用了我们库中已经引用的模块
    // 但是别人使用我们库的时候还需要再引用我们需要的模块
    externals: [
        'lodash',
    ],

    output: {
        filename: 'math',
        path: path.resolve(__dirname, 'dist'),
        library: 'math', // 使用 src 直接引入的时候 用 root 就可以使用 root.xxx
        libraryTarget: 'umd',  // umd 代表可以使用 import, require, amd 引入
    }
}