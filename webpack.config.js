const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        'jswidgets': "./src/index.js",
        'examplehome': "./src/example/js/pages/home.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader', 'postcss-loader' ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [ 'style-loader', 'css-loader', 'postcss-loader', 'sass-loader' ]
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                use: [
                    'file-loader?name=assets/images/[name].[ext]'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            chunks: ['examplehome'],
            template: './src/example/index.html',
            filename: './index.html'
        }),
        new webpack.ProvidePlugin({
            "$": 'jquery',
            'React': 'react',
            'ReactDOM': 'react-dom',
            'css' : 'emotion'
        })
    ]
};