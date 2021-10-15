// We need to use merge to combine webpack.common and
// webpack.dev
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

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
					// Use MiniCssExtractPlugin
					// to put css in separate files
					// linked to in the head
					MiniCssExtractPlugin.loader,
					"css-loader",
					"postcss-loader"
				],
			},
		],
	},
	plugins: [
		// Extract CSS into separate files
		new MiniCssExtractPlugin(),
	],
	mode: "production",
	optimization: {
        // Pull out a separate runtime chunk
		runtimeChunk: "single",
		splitChunks: {
			cacheGroups: {
                // Split out a separate chunk for React
                react: {
                    test: /[\\/]node_modules[\\/]((react).*)[\\/]/,
                    name: "react",
                    chunks: "all"
                },
                // Split out a separate chunk for
                // everything else that's in node_modules
				vendor: {
					test: /[\\/]node_modules[\\/]((?!react).*)[\\/]/,
					name: "vendors",
					chunks: "all",
				},
			},
		},
	},
});
