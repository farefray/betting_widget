const path = require('path')
const webpack = require('webpack')
// const CleanWebpackPlugin = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { cssLoaders, htmlPage } = require('./tools')
const rootDir = path.resolve(__dirname, '..')
const { version } = require('../package.json');

let resolve = (dir) => path.join(rootDir, 'src', dir)

const mode = process.env.NODE_ENV;
module.exports = {
  mode,
  entry: {
    popup: resolve('./popup'),
    tab: resolve('./tab'),
    options: resolve('./options'),
    content: resolve('./content'),
    devtools: resolve('./devtools'),
    panel: resolve('./devtools/panel'),
    background: resolve('./background')
  },
  output: {
    path: path.join(rootDir, 'dist'),
    publicPath: '/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].[name].js?[hash]',
    library: '[name]'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@modules': resolve('../src/modules'),
      '@components': resolve('../src/components'),
      '@entities': resolve('../src/entities'),
      '@content': resolve('../src/content')
    }
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        extractCSS: true,
        loaders: {
          ...cssLoaders(),
          js: { loader: 'babel-loader' }
        },
        transformToRequire: {
          video: 'src',
          source: 'src',
          img: 'src',
          image: 'xlink:href'
        }
      }
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [
        path.join(rootDir, 'src'),
        // https://github.com/sagalbot/vue-select/issues/71#issuecomment-229453096
        path.join(rootDir, 'node_modules', 'element-ui', 'src', 'utils')
      ]
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'img/[name].[hash:7].[ext]'
      }
    }, {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'media/[name].[hash:7].[ext]'
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'fonts/[name].[ext]'
      }
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      global: 'window'
    }),
    // Customize your extension structure.
    htmlPage('home', 'app', ['manifest', 'tab']),
    htmlPage('popup', 'popup', ['manifest', 'popup']),
    htmlPage('panel', 'panel', ['manifest', 'panel']),
    htmlPage('devtools', 'devtools', ['manifest', 'devtools']),
    htmlPage('options', 'options', ['manifest', 'options']),
    htmlPage('background', 'background', ['manifest', 'background']),
    // End customize
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([{ from: path.join(rootDir, 'static') },
      {
        from: './src/manifest.json',
        to: 'manifest.json',
        transform: (content) => {
          const jsonContent = JSON.parse(content);
          jsonContent.version = version;

          if (mode === 'development') {
            jsonContent['content_security_policy'] = "script-src 'self' 'unsafe-eval'; object-src 'self'";
          }

          return JSON.stringify(jsonContent, null, 2);
        }
      }])//
    //, new CleanWebpackPlugin(['*'], { root: path.join(rootDir, 'dist') })
  ],
  performance: { hints: false }
}
