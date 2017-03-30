module.exports = {
  entry: "./pipe_webpack.js",
  output: {
    path: __dirname,
    filename: "pipe_webpack.bundle.js"
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }],
  },
  resolve: {
    alias: {
      underscore: 'lodash',
    },
  },
};
