const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './client/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test:/\.(s*)css$/,
        use:['style-loader','css-loader', 'sass-loader']
     }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, '.'),
    publicPath: 'http://localhost:8080/build',
    compress: true,
    port: 8080,
    proxy: {
      '/': {
        target: 'http://localhost:3000/',
      }
    }
  }
};