const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry:"./src/js/index.js",
    output:{
        filename:"[name].[chunkhash].js",

    },
    module:{
        rules:[{
            test:/\.js$/,
            use:[{
                loader:"babel-loader",
                options:{
                    presets:["@babel/preset-env"]
                }
            }]
        },{
            test:/\.scss$/,
            use:["style-loader", "css-loader", "sass-loader" ]
        },{
            test:/\.(jpg|png|gif)$/,
            use:[{
                loader:"url-loader",
                options:{
                    limit:8192
                }
            }]
        }]
    },
    plugins:[new htmlWebpackPlugin({
        template:"./src/index.html"
    })]
}