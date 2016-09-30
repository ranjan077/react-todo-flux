var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname),
  devtool: 'source-map',
  entry: "./src/js/index.js",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']}
      },
      {
         test: /\.s?css$/, 
         loader: 'style!css!sass'
      }
    ]
  },
  output: {
    path: __dirname + "/lib/",
    filename: "bundle.js"
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, "./src/css")]
  }
};
