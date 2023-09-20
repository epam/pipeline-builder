const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageJson = require('./package.json');

module.exports = function (env, args) {
  const mode = !args.mode || /^production$/i.test(args.mode)
    ? 'production'
    : 'development';
  const production = mode === 'production';
  const demoEntryName = production ? 'demo' : 'main';
  return {
    mode,
    entry: {
      pipeline: {
        import: path.resolve(__dirname, './src/pipeline.ts'),
        library: {
          type: 'umd',
          name: 'pipeline-builder',
          umdNamedDefine: true,
        }
      },
      [demoEntryName]: {
        import: path.resolve(__dirname, './src/demo.ts'),
        dependOn: 'pipeline',
      }
    },
    output: {
      publicPath: '/',
      path: path.resolve('./dist'),
      filename: '[name].js',
      clean: true,
      assetModuleFilename: 'static/[name].[ext][query]',
    },
    target: ['web', 'es5'],
    optimization: {
      minimize: false, // minification implemented via separate gulp task, see `scripts/build.js` `minify`
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    devtool: production ? 'source-map' : 'inline-source-map',
    devServer: {
      port: 3333,
      hot: true,
      open: true
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: ['ts-loader'],
        },
        {
          test: /\.scss$/i,
          sideEffects: true,
          use: [
            production ? MiniCssExtractPlugin.loader : 'style-loader',
            { loader: 'css-loader', options: { esModule: false } },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      'postcss-preset-env',
                    ],
                  ],
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.css$/,
          sideEffects: true,
          use: [
            production ? MiniCssExtractPlugin.loader : 'style-loader',
            { loader: 'css-loader', options: { esModule: false } },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      'postcss-preset-env',
                    ],
                  ],
                },
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new HtmlWebpackPlugin({
        inject: true,
        filename: production ? 'demo.html' : 'index.html',
        template: path.resolve('./src/demo.html'),
      }),
      new webpack.DefinePlugin({
        PACKAGE_VERSION: JSON.stringify(packageJson.version),
        DEBUG: JSON.stringify(!production)
      }),
    ],
  };
}
