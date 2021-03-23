const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: [
                './src/scss/style.scss',
                './src/index.js'
                
            ],
    
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/main.js',
         publicPath: '.'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },{
            test: /\.svg$/,
            use: [
              {
                loader: "babel-loader"
              },
              {
                loader: "react-svg-loader",
                options: {
                  jsx: true // true outputs JSX tags
                }
              }
            ]
        },{
            test: /\.(css|sass|scss)$/,
            //include: path.resolve(__dirname, 'src/scss'),
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: "css-loader",
                    options: {
                        sourceMap: true,
                        minimize: true,
                        url: false
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            autoprefixer({
                                browsers:['ie >= 8', 'last 4 version']
                            })
                        ],
                        sourceMap: true
                    }
                },
                {
                    loader: "sass-loader",
                    options: {
                    sourceMap: true
                    }
                }]
            })  
        }]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/style.css',
            disable: false,
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: './src/html/index.html',
            hash: true,
            filename: 'index.html'
        }),
        new CopyWebpackPlugin([{
            from: './src/img',
            to: 'img'
        },
        {
            from: './src/fonts',
            to: 'fonts'
        }]),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
};

