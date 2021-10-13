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
		filename: "[name].bundle.js",
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
		],
	},
    plugins: [
        // Creates a new index.html in the build
        // directory. The index.html doesn't depend
        // on an index.html in src. It's created
        // from the settings above every time we 
        // build
        new HtmlWebpackPlugin({
            title: 'Whatever',
        }),
    ],
};
