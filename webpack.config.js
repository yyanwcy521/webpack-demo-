//commonjs规范
let path = require('path');
let HtmlWebpackPlugin = require("html-webpack-plugin");
let CleanWebpackPlugin = require("clean-webpack-plugin");
let webpack = require('webpack');
//单页index.html引用了多个js
//多页 a.html-index.js /b.html-b.js

//样式文件抽离
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

//将css和less对应不同的文件里
let lessExtract = new ExtractTextWebpackPlugin({
    filename:'css/less.css',
    disable : true
});
let cssExtract = new ExtractTextWebpackPlugin({
    filename:'css/css.css',
    disable : true
});
module.exports = {
    entry:'./src/index.js',
    // entry:['./src/index.js','./src/a.js'],  //入口
    // entry:{
    //     index:'./src/index.js',
    //     a:'./src/a.js'
    // },
    output:{
        // filename:'build.[hash:8].js',//多对一
        filename:'[name].[hash:8].js',//多对多
        //这个路径必须是绝对路径
        path:path.resolve("./build")
    }, //出口
    devServer:{
        contentBase:"./build",
        port:3000,
        compress:true,//服务器压缩 gzip..等等
        open:true,//自动打开浏览器
        hot:true
    }, //开发服务器
    module:{}, //模块配置
    plugins:[
        // new ExtractTextWebpackPlugin({
        //     filename:'/css/index.css'
        // }),
        lessExtract,
        cssExtract,
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['./build']),
        //打包html插件
        new HtmlWebpackPlugin({
            template:"./src/index.html",
            title:"这是一个标题",
            hash:true,//清缓存用的
            // minify:{
            //     removeAttributeQuotes:true,//删除标签属性的双引号
            //     collapseWhitespace:true //删除空行
            // }
        })
        // new HtmlWebpackPlugin({
        //     filename:'a.html',
        //     template:"./src/index.html",
        //     title:"这是一个标题",
        //     hash:true,//清缓存用的,
        //     chunks:['index']
        // }),
        // new HtmlWebpackPlugin({
        //     filename:'b.html',
        //     template:"./src/index.html",
        //     title:"这是一个标题",
        //     hash:true,//清缓存用的
        //     chunks:['a']
        // })
    ], //插件配置
    mode:'development', //可以更改模式
    resolve:{}, //配置解析
    module:{
        rules:[//从右往左写
            {test:/\.css$/,use:lessExtract.extract({
                fallback:'style-loader',
                use:[
                    {loader:'css-loader'}
                ]})
                },
            {test:/\.less$/,use:cssExtract.extract({
                fallback:'style-loader',
                use:[
                    {loader:'css-loader'},
                    {loader:'less-loader'}
                ]})
                }
        ]
    }
}

//1.在webpack中如何配置开发服务器，webpack-dev-server
//2.webpack插件 1将html打包到build下可以自动引入生产的js
//3.抽离样式，公共样式抽离到一个css文件中 从这个文件中引出样式

//let MiniCssTractPlugin = mini-css-extract-plugin;
//plugins:[new MiniCssTractPlugin({filename:css/css.css})]
// rules:[//从右往左写
//     {test:/\.css$/,use:[
//         MiniCssTractPlugi.loader,
//         {loader:'css-loader'}
//     ]}
//     },
//     {test:/\.less$/,
//         use:[
//             MiniCssTractPlugi.loader,
//             {loader:'css-loader'},
//             {loader:'less-loader'}
//        ]
//         }
// ]


// purifycss-webpack purify-css glob
// 这几个模块用来剔除掉不用的样式
//let PurifycssWebpack = require("purifycss-webpack");
//HtmlWebpackPlugin 插件之后 
//  new PurifycssWebpack({
//     paths:glob.sync(path.resolve('src/*.html'));
// })

//postcss-loader autoprefixer 自动加前缀  -webkit-
//根目录新建一个postcss.config.js文件配置

//copy-webpack-plugin 将文件原封不动的放入build文件夹
// plugin:[
//     new copywebpackplugin({
//        [ from:'./src/doc',
//         to:'public']
//     })
// ]