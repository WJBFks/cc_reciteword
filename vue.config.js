module.exports = {
    //是否在保存时检查
    lintOnSave: false,

    devServer: {
        host: "localhost", //本机ip
        port: 8081, //本机端口
        open: true,
        proxy: {
            "/fanyi": {
                //代理别名
                target: "https://fanyi-api.baidu.com/", //代理目标值
                changeOrigin: true,
                secure: true,
                pathRewrite: {
                    //替换路径中的/api
                    "^/fanyi": "",
                },
                /*pathRequiresRewrite: {
                                  '^/api': ''
                                }*/
            },
        },
        overlay: {
            warning: false,
            errors: true,
        },
    },

    publicPath: './'
};