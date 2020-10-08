const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

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

const minervaConfig = {
    entry: {
        'minerva-cna': "./src/example/js/pages/minerva-cna.js"
    },
    output: {
        filename: "minerva-cna.js",
        path: path.resolve("C:/Users/Damian/Documents/Web/Minerva/public/app/js")
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
}

const exampleConfig = {
    entry: {
        'home': "./src/example/js/pages/home.js",
        'exampleform': "./src/example/js/pages/form.js",
        'exampleinput': "./src/example/js/pages/input.js",
        'examplenode': "./src/example/js/pages/node.js",
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
            chunks: ['home'],
            filename: './index.html'
        }),
        new HtmlWebPackPlugin({
            template: './src/example/form.html',
            chunks: ['exampleform'],
            filename: './form.html'
        }),
        new HtmlWebPackPlugin({
            template: './src/example/input.html',
            chunks: ['exampleinput'],
            filename: './input.html'
        }),
        new HtmlWebPackPlugin({
            template: './src/example/node.html',
            chunks: ['examplenode'],
            filename: './node.html'
        }),
        new webpack.ProvidePlugin({
            "$": 'jquery',
            'React': 'react',
            'ReactDOM': 'react-dom',
            'css' : 'emotion'
        })
    ]
}

module.exports = [libConfig, minervaConfig, exampleConfig]