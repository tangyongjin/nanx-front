module.exports = {
    modulePaths: ['<rootDir>/node_modules/', '<rootDir>/tests/__mocks__/'],

    transform: {
        '^.+\\.(ts|js|html)$': './ignore_css.js'
    },

    "moduleNameMapper": {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less)$": "identity-obj-proxy"
    },
    "testRegex": "src\\*.js$",




    unmockedModulePathPatterns: ['/^node_modules/'],
    "transformIgnorePatterns": [
        "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
        "[/\\\\]node_modules[/\\\\].+\\.css$",
        "^.+\\.module\\.css$",
        "^.+\\.module\\.js$",
        "^.+\\.module\\scss$"
    ],
};
