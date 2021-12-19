require('dotenv').config()

const { resolve } = require('path')
const webpack = require('webpack')
const ESLintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const { SOCKETS_ENABLE } = process.env

const config = {
  entry: './client/main.jsx',
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  output: {
    filename: 'assets/js/[name].bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
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
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          },
          'postcss-loader',
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
      filename: 'assets/css/style.css'
    }),
    new HtmlWebpackPlugin({
      template: 'client/index.html',
      favicon: 'favicon.ico'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'client/html.js',
          to: '[name][ext]'
        },
        {
          from: `client/assets/images`,
          to: 'assets/images',
          globOptions: {
            ignore: ['.gitkeep']
          }
        },
        {
          from: `client/assets/fonts`,
          to: 'assets/fonts',
          globOptions: {
            ignore: ['.gitkeep']
          }
        },
        {
          from: `server/public/favicon.ico`,
          to: '[name][ext]'
        }
      ]
    }),
    new webpack.DefinePlugin({
      SOCKETS_ENABLE: !!SOCKETS_ENABLE
    })
  ]
}

module.exports = config
