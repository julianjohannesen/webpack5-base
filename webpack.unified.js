const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const BundleAnalyzerPlugin =
require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const mode =
	process.env.NODE_ENV === "development" ? "development" : "production";
const dev = mode === "development";

const entry = {
	index: {
		import: "./src/index.js",
		dependOn: "shared",
	},
	print: {
		import: "./src/print.js",
		dependOn: "shared",
	},
	shared: "lodash",
};

const output = {
	filename: dev ? "[name].js" : "[name].[contenthash].js",
	path: path.resolve(__dirname, "build"),
	clean: true,
};

// Alternate source maps depending on environment
const devTool = dev ? "eval-source-map" : "source-map";

const devServer = {
	client: {
		logging: "verbose",
		// overlay: true,
		// progress: true,
	},
	compress: true,
	open: true,
	static: {
		directory: path.join(__dirname, "build"),
	},
};

const rules = [
	{
		test: /\.s(a|c)ss$/i,
		use: [
			// Alternate style loader and mini css extract plugin based on environment
			process.env.NODE_ENV !== "production"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
			"css-loader",
			{
				loader: "postcss-loader",
				options: {
					postcssOptions: {
						plugins: [
							[
								"postcss-preset-env",
								"autoprefixer"
							],
						],
					},
				},
			},
			"sass-loader",
		],
	},
	{
		test: /\.(png|svg|jpg|jpeg|gif)$/i,
		type: "asset/resource",
	},
	{
		test: /\.(woff|woff2|eot|ttf|otf)$/i,
		type: "asset/resource",
	},
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
							useBuiltIns: "usage",
							corejs: "^3.18.3",
						},
					],
				],
				plugins: [
					[
						"@babel/plugin-transform-runtime",
						{ corejs: { version: 3, proposals: true } },
					],
				],
			},
		},
	},
];

const plugins = [
	new HtmlWebpackPlugin({
		title: "Webpack 5 Base",
	}),
	new MiniCssExtractPlugin(),
	// new BundleAnalyzerPlugin(),
];

const optimization = () => {
	if (!dev) {
		return {
			// Separate runtime chunk
			runtimeChunk: "single",
			splitChunks: {
				cacheGroups: {
					// Separate chunk for React
					react: {
						test: /[\\/]node_modules[\\/]((react).*)[\\/]/,
						name: "react",
						chunks: "all",
					},
					// Separate all others in node_modules
					vendor: {
						test: /[\\/]node_modules[\\/]((?!react).*)[\\/]/,
						name: "vendors",
						chunks: "all",
					},
				},
			},
		};
	} else {
		undefined;
	}
};

module.exports = {
	mode: mode,
	entry: entry,
	output: output,
	devtool: devTool,
	devServer: devServer,
	module: { rules: rules },
	plugins: plugins,
	optimization: optimization(),
};
