/* global __dirname */

var path = require('path');
var glob = require('glob');

var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

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
        loaders: [ // loaders will work with webpack 1 or 2; but will be renamed "rules" in future
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    },
    plugins: [],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map',
};