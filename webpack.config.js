module.exports = {
    entry: './lib/app.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/public/build'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.ts'],
        alias:{
            scripts: __dirname + '/lib'
        }
    },
    module:{
        loaders: [
            { test: /\.(glsl|vs|fs)$/, loader: 'shader' },
        ]
    },
    glsl: {
        chunkPath: __dirname + "/public/scripts/shaders/chunks"
    }
};
