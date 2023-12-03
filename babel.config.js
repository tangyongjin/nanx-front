module.exports = {
    plugins: ['react-hot-loader/babel', ['@babel/plugin-transform-private-property-in-object', { loose: true }]],
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
