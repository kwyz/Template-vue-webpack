const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'webpack.build.js'
    },
    // devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.vue', '.json']
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(vue | js | html)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: path.join(__dirname, '..', 'src'),
                options: {
                    formatter: require('eslint-friendly-formatter'),
                    emitWarning: true
                }
            }
        ]
    },

    devServer: {
        host: 'localhost',
        port: 8080,
        open: true,
    },

    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    },

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                test: /\.(vue | js | html)$/
            })
        ]
    },

    plugins: [
        new VueLoaderPlugin({}),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
    ]
}
