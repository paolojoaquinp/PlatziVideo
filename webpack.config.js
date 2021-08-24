/* eslint-disable indent */
const path = require('path');
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

require('dotenv').config();

const isDev = process.env.ENV === 'development';
const entry = ['./src/frontend/index.js'];

if (isDev) {
    entry.push('webpack-hot-middleware/client?path=/_webpack_hmr&timeout=2000&reload=true');
}

module.exports = {
    entry,
    mode: process.env.ENV,
    output: {
        path: path.resolve(__dirname, 'src/server/public'),
        filename: isDev ? 'assets/app.js' : 'assets/app-[hash].js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserWebpackPlugin()],
        splitChunks: {
            chunks: 'async',
            cacheGroups: {
                vendors: {
                    name: 'vendors',
                    chunks: 'all',
                    reuseExistingChunk: true,
                    priority: 1,
                    filename: isDev ? 'assets/vendor.js' : 'assets/vendor-[contenthash].js',
                    enforce: true,
                    test(module, chunks) {
                        const name = module.nameForCondition && module.nameForCondition();
                        // eslint-disable-next-line arrow-parens
                        return (chunk => chunk.name !== 'vendors' && /[\\/]node_modules[\\/]/.test(name));
                    },
                },
            },
        },
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    // eslint-disable-next-line quotes
                    loader: "babel-loader",
                },
            },
            {
                test: /\.html$/,
                use: [
                    {
                        // eslint-disable-next-line quotes
                        loader: "html-loader",
                    },
                ],
            },
            {
                test: /\.(s*)css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|gif|jpg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/[md5:hash].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        isDev ? new webpack.HotModuleReplacementPlugin() :
        () => { },
        isDev ? () => { } :
        new CompressionWebpackPlugin({
            test: /\.js$|\.css$/,
            filename: '[path][base].gz',
        }),
        isDev ? () => { } :
        new WebpackManifestPlugin(),
        // new HtmlWebpackPlugin({
        //     inject: true,
        //     template: './public/index.html',
        //     filename: './index.html',
        // }),
        new MiniCssExtractPlugin({
            filename: isDev ? 'assets/app.css' : 'assets/app-[hash].css',
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        historyApiFallback: true,
        port: 3001,
    },
// eslint-disable-next-line eol-last
};