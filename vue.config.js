/**
 * @Description: 
 * @Author: Libra
 * @GitHub: https://github.com/Libra-Lei
 * @Date: 2021-08-06 16:05:28
 * @LastEditors: Libra
 * @LastEditTime: 2021-08-06 17:36:59
 */
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  productionSourceMap: false, // 关闭map文件输出
  configureWebpack: config => {
    console.log('打包环境：', process.env.NODE_ENV, process.env.VUE_APP_REMARK)
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'dev') {
      return {
        output: {
          filename: '[name].[id].[hash].js' // 输出文件加指纹，防止浏览器的缓存
        },
        optimization: {
          splitChunks: {
            chunks: 'all'
          }
        },
        plugins: [
          new CompressionPlugin({
            algorithm: 'gzip',
            test: new RegExp('\\.(js|css)$'),
            // 只处理大于1M的文件，默认：0
            threshold: 10240,
            // 示例：一个1024b大小的文件，压缩后大小为768b，minRatio : 0.75
            minRatio: 0.8, // 默认: 0.8
            // 是否删除源文件，默认: false
            deleteOriginalAssets: false
          })
        ]
      }
    }
  },
  devServer: {
    port: 9101,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    // proxy: {
    //   // api
    //   [process.env.VUE_APP_API]: {
    //     target: `http://192.168.1.151:8181`,
    //     changeOrigin: true
    //   }
    // }
  }
}

