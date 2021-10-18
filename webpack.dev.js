// merge() merges webpack.common and webpack.dev
const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = merge(common, {
	// eval-source-map is the highest quality development setting for source mapping
	devtool: "eval-source-map",
	// Many of the dev-server options below are probably the default settings, but checking that is a real pain in the neck.
	devServer: {
		allowedHosts: [
			"localhost",
			"127.0.0.1"
		],
		client: {
			logging: "verbose",
			overlay: true,
			progress: true,
		},
		compress: true,
		headers: { "mycustomheader": "This is my custom header, blah, blah"},
		https: true,
		open: true,
		port: 5500,
		static: {
			directory: path.join(__dirname, 'build'),
		},
	},
	mode: "development",
	module: {
		rules: [
			{
				test: /\.(css | sass | scss)$/i,
				use: [
					// Style-loader in dev
					"style-loader",
					"css-loader",
					"postcss-loader",
					"sass-loader",
				],
			},
		],
	},
	plugins: [
		// Bundle Analyzer creates a visual
		// representation of your module
		// dependencies as chunks
		new BundleAnalyzerPlugin(),
	],
});
