module.exports = {
    entry: './earth-quake/main',
    output: {
        filename: './earth-quake/bundle.js'
    },
    module: {
        loader: [
            {test: /\.ts?$/, loader: 'awesome-typescript-loader'}
        ]
    }
};
