// We need to use merge to combine webpack.common and
// webpack.dev
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

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
        {
            // In Webpack 5 we still need plugins
            // to load our CSS.
            test: /\.css$/i,
            use: [
                // We use style loader to add css
                // to our head in <style> tags
                "style-loader",
                "css-loader"
            ],
        },
    ]}
});