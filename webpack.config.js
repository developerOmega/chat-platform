const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './assets/js/app.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public/js/'),
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.vue$/, exclude: /node_modules/, loader: "vue-loader" },
      { test: /\.css$/, exclude: /node_modules/, use: [ 'vue-style-loader', 'css-loader']},
      { test: /\.s[ac]ss$/i, exclude: /node_modules/, use: ['style-loader','css-loader','sass-loader',],},
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
    }
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin()
  ],
  mode: 'development'
};