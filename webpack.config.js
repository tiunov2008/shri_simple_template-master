const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatoscopePlugin = require('@statoscope/webpack-plugin').default;

const config = {
  mode: 'production',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
    open: true,
  },
  entry: {
    main: './src/index.js',
  },
  resolve: {
    fallback: {
      abc: false,
      xyz: path.resolve(__dirname, 'path/to/file.js'),
    },
  },
  optimization: {
    minimize: true,
    innerGraph: true,
    concatenateModules: true,
    moduleIds: 'deterministic',
    splitChunks: {
      minChunks: 2,
      chunks: 'all',
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
        }
      }
    },
    runtimeChunk: {
      name: 'runtime',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new StatoscopePlugin({
      saveReportTo: 'report.html',
      saveStatsTo: 'stats.json',
      saveOnlyStats: false,
      open: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                ['@babel/preset-react', { runtime: 'automatic' }],
              ],
              plugins: [
                'lodash'
              ],
            },
          },
        ],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    library: {
      name: 'UUID',
      type: 'var',
    },
  },
};

module.exports = config;
