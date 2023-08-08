const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  //can switch between development and production
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      //at this point install these: npm install -D babel-loader @babel/core @babel/preset-env @babel/preset-react
      {
        test: /\.jsx?/, //testing anything that ends in .js or .jsx
        exclude: /(node_modules)/, //are excluding the folder that hold the node modules dependencies. Put () around node_modules
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      //at this point install these: npm install -D sass style-loader css-loader sass-loader
      {
        test: /\.s?css/,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  //at this point, npm install webpack-dev-server --save-dev
  //at this point, npm install -D webpack-cli
  //at this point,  npm install --save-dev html-webpack-plugin
  //also, ensure to require in HtmlWebpackPlugin at the top of this file
  // npm install nodemon
  //maybe npm install webpack ! we got an error that webpack command not found
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './client/index.html'),
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, './build'),
    },
    port: 8080,
    open: true,
    hot: true,
    compress: true,
    proxy: {
      '/': 'http://localhost:3001',
    },
  },
};
