const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: [
                './src/scss/style.scss',
                './src/index.js',
                
            ],
    mode: "development",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/main.js',
        publicPath: '/'
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
                use: ['style-loader', {
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
        }]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: './css/style.css',
            disable: true,
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: './src/html/index.html',
            hash: true,
            filename: 'index.html'
        }),
        new CopyWebpackPlugin([{
            from: './src/img',
            to: './img'
        },
        {
            from: './src/fonts',
            to: './fonts'
        }]),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    devServer: {
        host: '172.16.0.2',
        hot: true,
        historyApiFallback: true,
    }  
};

