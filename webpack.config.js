var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var PROD = process.env.NODE_ENV === 'production';

module.exports = {
    context: __dirname,

    entry: {
        index: [
            './static/js/index'
        ],
    },

    output: {
        path: path.resolve('./static/bundle'),
        filename: "[name].wp.js"
    },

    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
        new ExtractTextPlugin("[name].wp.css", {
            allChunks: true
        })
    ].concat(PROD ? [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: {
                warnings: false
            }
        })
    ] : []),

    module: {
        loaders: [
           {
                test: /\.js(x)?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=(\d+\.?){1,4})?$/,
                loader: 'file-loader'
            }
        ]
    },

    resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
        extensions: ['', '.js', '.jsx', '.rt']
    },

    devtool: !PROD ? "source-map" : ""
};
