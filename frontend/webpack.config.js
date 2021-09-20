const {resolve} = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    entry: [
        './src/index.tsx',
    ],
    mode: 'development',
    output: {
        filename: 'main.js',
        path: resolve(__dirname, 'static'),
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-typescript'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'image/[name].[ext]',
                        },
                    },
                    {
                        loader: 'svgo-loader',
                        options: {
                            name: 'image/[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [
            '.tsx',
            '.ts',
            '.js',
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
        new ForkTsCheckerWebpackPlugin(),
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },
};
