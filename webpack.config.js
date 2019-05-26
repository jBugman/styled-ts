const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: '[name].[contenthash].js',
    path: __dirname + "/dist"
  },

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test: /\.(png|svg|jpg|jpeg)$/,
        loader: 'file-loader?name=./static/[name].[ext]'
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  mode: "development",

  devServer: {
    compress: false,
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    open: "Google Chrome"
  }
};
