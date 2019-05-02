const webpack = require('webpack')
const merge = require('webpack-merge')
const ZipPlugin = require('zip-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const baseWebpack = require('./webpack.base')
const { styleLoaders } = require('./tools')

module.exports = merge(baseWebpack, {
  module: { rules: styleLoaders({ extract: true, sourceMap: true }) },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
    new OptimizeCSSPlugin({ cssProcessorOptions: { safe: true } }),
    new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
    new webpack.HashedModuleIdsPlugin(),
    new ZipPlugin({
      path: '..',
      filename: 'extension.zip'
    })
  ]
})
