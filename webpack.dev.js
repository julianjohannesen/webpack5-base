// We need to use merge to combine webpack.common and
// webpack.dev
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
    // "eval-source-map is the highest quality
    // development setting for source mapping
    devtool: "eval-source-map",
    devServer: {
        static: './build',
    },
	mode: "development",
    module: {
        rules: [
            // Note that webpack 5 suports hot
            // module replacement by default.
        {
            test: /\.s[ac]ss$/i,
            use: [
                // Style-loader in dev
                "style-loader",
                "css-loader",
                "postcss-loader",
                "sass-loader"
            ],
        },
    ]},
    plugins: [
        // Bundle Analyzer creates a visual
        // representation of your module
        // dependencies as chunks
        new BundleAnalyzerPlugin()
    ]
});