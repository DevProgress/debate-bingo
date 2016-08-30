var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/debate-bingo.js',
  context: __dirname,
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
    }),
    new CopyPlugin([
      {from: 'src/index.html'},
      {from: 'data', to: 'data'}
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"' + process.env.NODE_ENV + '"'
      }
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.json'] 
  }
};