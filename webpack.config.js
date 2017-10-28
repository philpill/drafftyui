/* global __dirname */

const path = require('path');
const glob = require('glob');

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css"
});


var dir_sass = path.resolve(__dirname, 'assets/sass');
var dir_ts = path.resolve(__dirname, 'assets/ts');
var dir_build = path.resolve(__dirname, 'static');

module.exports = {
    entry: {
        bundle: path.resolve(dir_ts, 'main.ts'),
    },
    output: {
        path: dir_build,
        filename: 'js/[name].js'
    },
    devServer: {
        contentBase: dir_build,
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js'] // note if using webpack 1 you'd also need a '' in the array as well
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
            },
            { test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        }]
    },
    plugins: [
        extractSass
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map',
};