var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/debate-bingo.js',
  output: {
    path: './dist',
    filename: 'bundle.js'       
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css', {
      allChunks: true
    })
  ],
  resolve: {
    extensions: ['', '.js', '.json'] 
  }
};