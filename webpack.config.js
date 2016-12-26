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
};
