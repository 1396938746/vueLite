module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        // 设置代理
        proxy: {
            '/api': {
                // target: 'https://admin.30000bet.com/agent/',
                target: 'http://admin.cc/agent/',
                changeOrigin: true,
                // pathRewrite: {
                //     '^/': ''
                // }
            }
        }
    }
}
