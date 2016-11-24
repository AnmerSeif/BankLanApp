/// <binding />
/// <binding ProjectOpened='Watch - Development' /> 
var webpack = require('webpack');
var path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


var SRC_DIR = path.resolve(__dirname, 'src');
var DIST_DIR = path.resolve(__dirname, 'dist');


const sassLoaders = [
  'css-loader',
  'sass-loader?includePaths[]=' + SRC_DIR
]

module.exports = {
    devServer: {
        contentBase: "./dist",
        host: "localhost",
        port: 3000,
        historyApiFallback: true
    },
    entry: [
        'bootstrap-loader', './src',
        SRC_DIR + '/index.jsx',
        SRC_DIR + '/sass/main.scss'
    ],
    output: {
        path: DIST_DIR,
        publicPath: 'dist',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx/,
                include: SRC_DIR,
                loader: "babel",
            },
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                loader:"url"
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
            },
        ]

    },
    plugins: [
      new ExtractTextPlugin('bundle.css'),
      new webpack.ProvidePlugin({
          jQuery: 'jquery'
      }),
      new WebpackNotifierPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
}