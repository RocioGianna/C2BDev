const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const SRC_DIR = path.resolve(__dirname, "src");
const OUTPUT_DIR = path.resolve(__dirname, "dist");

const defaultInclude = [SRC_DIR];

module.exports = {
	entry: SRC_DIR + "/index.js",
	mode: "production",
	output: {
		path: OUTPUT_DIR,
		publicPath: "./",
		filename: "bundle.js",
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [{ loader: "style-loader" }, { loader: "css-loader" }],
				include: defaultInclude,
			},
			{
				test: /\.jsx?$/,
				use: [{ loader: "babel-loader" }],
				include: defaultInclude,
				resolve: {
					fullySpecified: false,
				},
			},
			{
				test: /\.(jpe?g|png|gif|mp4)$/,
				type: "asset/resource",
				include: defaultInclude,
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				type: "asset/inline",
				include: defaultInclude,
			},
		],
	},
	target: "web",
	plugins: [
		new HtmlWebpackPlugin({
			title: "2B Conexion",
			template: path.resolve(__dirname, "public/index.html"),
			inject: "body",
		}),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("production"),
		}),
	],
	stats: {
		colors: true,
		children: false,
		chunks: false,
		modules: false,
	},
};
