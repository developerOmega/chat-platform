const path = require('path');

module.exports = {
  entry: './assets/js/app.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public/js/'),
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  mode: 'development'
};