const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    host: '127.0.0.1',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8858/',
        pathRewrite: {
          '^/api': '/'
        },
        changeOrigin: true,
        logLevel: 'debug'
      }
    }
  }
})
