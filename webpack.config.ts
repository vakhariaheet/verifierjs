import * as path from 'path';

export default {
	entry: './src/index.ts',
	output: {
		path: path.join(__dirname, 'dist'),
		library: 'verifierjs',
		libraryTarget: 'umd',
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: ['ts-loader'],
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
};
