const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: {
		index: {
            import: "./src/index.js",
            dependOn: "shared"
        },
		print: {
            import: "./src/print.js",
            dependOn: "shared"
        },
        shared: "lodash"
	},
	output: {
		// Don't forget that dynamically named
		// bundles means that we can create a
		// separate bundle for each entry point
		filename: "[name].[contenthash].js",
		path: path.resolve(__dirname, "build"),
        // Empty the build directory before 
        // every build
        clean: true
	},
	module: {
		rules: [
			{
				// Webpack handles images itself now
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
			},
			{
				// Webpack handles fonts itself now
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: "asset/resource",
			},
			// Webpack 5 supports hot module replacement by default.
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							[
								"@babel/preset-env",
								{
                                    // Refer to .browserslistrc for a list of targets
									// targets: "defaults",
									useBuiltIns: "usage",
									corejs: "^3.18.3", // As of Oct. 2021
								},
							],
						],
						plugins: [
							[
								"@babel/plugin-transform-runtime",
								{
									absoluteRuntime: false, // Default
									corejs: {version: 3, proposals: true}, // Changed to use CoreJS
									helpers: true, // Default
									// polyfill option removed in v7
									regenerator: true, // Default
									// useBuiltIns option removed in v7
									// useESModules now deprecated
									version: "^7.0.0-beta.0", // Default
								},
							],
						],
					},
				},
			},
		],
	},
    plugins: [
        // Creates a new index.html in the build
        // directory. The index.html doesn't depend
        // on an index.html in src. It's created
        // anew from the settings above every time
        // we build
        new HtmlWebpackPlugin({
            title: 'Webpack 5 Base',
        }),
    ],
};
