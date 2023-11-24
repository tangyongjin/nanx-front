module.exports = {
    plugins: ['react-hot-loader/babel'],
    presets: [
        [
            '@babel/preset-react',
            {
                throwIfNamespace: false // defaults to true
            }
        ],
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
