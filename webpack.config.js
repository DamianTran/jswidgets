const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const libConfig = {
    entry: {
        'jswidgets': "./src/index.js"
    },
    output: {
        library: 'jswidgets',
        libraryTarget: 'umd',
        filename: './cdn/[name].js'
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
        new webpack.ProvidePlugin({
            "$": 'jquery',
            'React': 'react',
            'ReactDOM': 'react-dom',
            'css' : 'emotion'
        })
    ]
};

const exampleConfig = {
    entry: {
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
}

module.exports = [libConfig, exampleConfig]