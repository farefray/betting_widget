const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');
const baseWebpack = require('./webpack.base')
const { styleLoaders } = require('./tools')

const rootDir = path.resolve(__dirname, '..')
const resolve = (dir) => path.join(rootDir, 'src', dir)

module.exports = merge(baseWebpack, {
  module: { rules: styleLoaders({ sourceMap: false }) },
  devtool: '#cheap-module-source-map',
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' }),
    new FriendlyErrorsPlugin(),
    new ChromeExtensionReloader({
      port: 9090, // Which port use to create the server
      reloadPage: true, // Force the reload of the page also
      entries: { // The entries used for the content/background scripts
        contentScript: 'content',
        background: 'background'
      }
    })
  ]
})
