const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = (_, argv) => ({
    entry: path.resolve(__dirname, 'src/index.ts'),
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    devtool: argv.mode === 'development' ? 'source-map' : false,
    module: {
        rules: [{
                test: /\.css$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.[jt]sx?$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                exclude: /node_modules/,
                options: {
                    tsConfigFile: 'tsconfig.json',
                }
            },
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
        ]
    },
    devServer: {
        port: 3000,
    },
    plugins: [
        new MiniCssExtractPlugin({
            sourceMap: true,
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html')
        }),
        new ForkTsCheckerWebpackPlugin(),
        new StyleLintPlugin({
            configFile: path.resolve(__dirname, 'stylelint.config.js'),
            files: '**/*.css',
            failOnError: false,
            quiet: false,
        })
    ],
})
