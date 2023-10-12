module.exports = {
    modulePaths: ['<rootDir>/node_modules/', '<rootDir>/tests/__mocks__/'],

    transform: {
        '^.+\\.(ts|js|html)$': '/ignore_css.js'
    },

    "testMatch": [
        "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
        "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
    ],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|scss)$': 'identity-obj-proxy',
        '^meteor/(.*):(.*)$': '<rootDir>/tests/__mocks__/meteor/$1_$2',
    },
    unmockedModulePathPatterns: ['/^node_modules/'],
    "transformIgnorePatterns": [
        "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
        "[/\\\\]node_modules[/\\\\].+\\.css$",
        "^.+\\.module\\.css$",
        "^.+\\.module\\.js$",
        "^.+\\.module\\scss$"
    ],
};
