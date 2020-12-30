require('dotenv').config()

const { resolve } = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const { PORT, SOCKETS_ENABLE } = process.env

const config = {
  entry: './client/main.js',
  mode: 'development',
  output: {
    filename: 'js/[name].bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {
    hot: true,
    // open: true,
    contentBase: resolve(__dirname, 'dist'),
    port: 8081,
    host: 'localhost',
    index: 'index.html',
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      context: ['/api', '/ws'],
      target: `http://localhost:${PORT || 8080}`,
      ws: (SOCKETS_ENABLE === 'true')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['js', 'jsx'],
      exclude: 'node_modules'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${__dirname}/client/index.html`,
          to: 'index.html'
        }
      ]
    }),
    new webpack.DefinePlugin({
      SOCKETS_ENABLE: SOCKETS_ENABLE === 'true'
    })
  ]
}

module.exports = config
