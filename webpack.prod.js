// We need to use merge to combine webpack.common and
// webpack.dev
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    devtool: "source-map",
    module: {
        rules: [
        {
            // In Webpack 5 we still need plugins
            // to load our CSS.
            test: /\.css$/i,
            use: [
                // We use MiniCssExtractPlugin
                // to put css in separate files
                // linked to in the head
                MiniCssExtractPlugin.loader,
                "css-loader"
            ],
        },
    ]},
    plugins: [
        // Extract CSS into separate files
        new MiniCssExtractPlugin()
    ],
	mode: "production",
});
