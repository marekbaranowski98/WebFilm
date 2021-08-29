const {resolve} = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    output: {
        filename: 'main.js',
        path: resolve(__dirname, 'static'),
    },
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
                loader: 'file-loader',
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
        new ImageMinimizerPlugin({
            minimizerOptions: {
                plugins: [
                    ['gifsicle', {interlaced: true,},],
                    ['jpegtran', {progressive: true,},],
                    ['optipng', {optimizationLevel: 5,},],
                    [
                        'svgo',
                        {
                            name: 'preset-default',
                            params: {
                                overrides: {
                                    builtinPluginName: {
                                        optionName: 'optionValue',
                                    },
                                    anotherBuiltinPlugin: false,
                                },
                            },
                        },
                        'moreBuiltinPlugin',
                        {
                            name: 'manyBuiltInPlugin',
                            params: {
                                optionName: 'value',
                            },
                        },
                    ],
                ],
            },
        }),
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },
};
