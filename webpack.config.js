const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const parts = require('./webpack/parts');
const vendorRegistry = require('./webpack/vendorRegistry');

const PATHS = {
    src: path.join(__dirname),
    dist: path.join(__dirname, 'dist'),
    static: path.join(__dirname, 'src', 'static'),
    globalStyles: path.join(__dirname, 'src', 'style')
};

const config = {
    entry: {
        app: './src/index.js',
        vendor: vendorRegistry
    },

    output: {
        path: PATHS.dist,
        filename: '[name].[chunkhash].js'
    },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 6,
            maxInitialRequests: 4,
            automaticNameDelimiter: '~',
            automaticNameMaxLength: 30,
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
        }
    }
};

function makeConfig() {
    switch (process.env.npm_lifecycle_event) {
        // PRODUCTION
        case 'build':
        case 'heroku-postbuild':
            return merge(
                config,
                parts.babel(PATHS.src),
                // parts.commonsChunk(),
                parts.htmlPlugin(),
                parts.copyDirs([
                    {src: PATHS.static, dest: `${PATHS.dist}/static`}
                ]),
                parts.definePlugin(true),
                parts.resolve(),
                parts.sourceMap(true),
                parts.fonts(),
                parts.css(PATHS.src, PATHS.globalStyles)
            );

        // DEVELOPMENT
        default:
            return merge(
                config,
                parts.babel(PATHS.src),
                // parts.commonsChunk(),
                parts.htmlPlugin(),
                parts.definePlugin(false),
                parts.resolve(),
                parts.sourceMap(false),
                parts.fonts(),
                parts.css(PATHS.src, PATHS.globalStyles),
                parts.devServer()
            );
    }
}

module.exports = makeConfig();
