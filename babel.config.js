module.exports = {
    plugins: ['react-hot-loader/babel'],
    presets: [
        [
            '@babel/preset-env',
            {
                loose: true,
                targets: {
                    node: 'current'
                }
            }
        ]
    ]
};
