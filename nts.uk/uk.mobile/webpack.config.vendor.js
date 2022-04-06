const path = require('path'),
    webpack = require('webpack'),
    UglifyJsPlugin = require("uglifyjs-webpack-plugin"),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = (env) => {
    return [{
        mode: env && env.prod ? 'production' : 'development',
        stats: {
            modules: false
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.common.js'
            },
            extensions: ['.js']
        },
        module: {
            rules: [
                { test: /\.(png|jpg|bmp|gif)(\?|$)/, use: 'url-loader?limit=100000' },
                {
                    test: /\.(woff|woff2|eot|ttf|svg)(\?|$)/, use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                            publicPath: './fonts'
                        }
                    }]
                },
                { test: /\.(sa|sc|c)ss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] }
            ]
        },
        entry: {
            vendor: [
                'lodash',
                'moment',
                'vue',
                'vuex',
                'vue-router',
                'vue-class-component',
                'vue-property-decorator',
                //'jquery',
                //'jqueryui',
                'highlight.js/styles/github.css',
                '@fortawesome/fontawesome-free/css/all.css',
                '@fortawesome/fontawesome-free/css/v4-shims.css',
                'animate.css/animate.css'
            ],
        },
        output: {
            path: path.join(__dirname, 'wwwroot', 'nts.uk.mobile.web', 'dist'),
            publicPath: path.join(__dirname, 'wwwroot', 'nts.uk.mobile.web', 'dist'),
            filename: '[name].js',
            library: '[name]_[hash]',
        },
        optimization: {
            minimize: env && env.prod,
            splitChunks: {
                chunks: 'async',
                minSize: 30000,
                maxSize: 0,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                automaticNameDelimiter: '~',
                name: true,
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            },
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    uglifyOptions: {
                        compress: true,
                        ecma: 6,
                        mangle: true,
                        output: {
                            comments: false
                        }
                    },
                    sourceMap: false
                }),
                new OptimizeCSSAssetsPlugin({
                    cssProcessor: require("cssnano"),
                    cssProcessorOptions: {
                        discardComments: {
                            removeAll: true,
                        },
                        // Run cssnano in safe mode to avoid
                        // potentially unsafe transformations.
                        safe: true,
                    },
                    canPrint: false
                })
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: '[name].css',
                chunkFilename: '[id].css',
            }),
            // Maps these identifiers to the jQuery package (because Bootstrap expects it to be a global variable)
            new webpack.ProvidePlugin({
                //$: 'jquery',
                //jQuery: 'jquery'
            }),
            new webpack.DllPlugin({
                path: path.join(__dirname, 'wwwroot', 'nts.uk.mobile.web', 'dist', '[name]-manifest.json'),
                name: '[name]_[hash]'
            })
        ]
    }];
};
