const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  watch: true,
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    historyApiFallback: true,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(css)$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(less)$/i,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: ['url-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Todo App',
      template: './public/index.html',
      favicon: 'src/assets/img/favicon.png',
      minify: true,
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/assets', to: 'assets' },
      ],
    }),
  ],
};
