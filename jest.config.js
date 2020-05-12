module.exports = {
    globals: {
        "ts-jest": {
            tsConfig: "tsconfig.json"
        }
    },
    moduleFileExtensions: [
        'ts', 'js', 'json',
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    testMatch: [
        "**/test/**/index.(ts|js)"
    ],
    coveragePathIgnorePatterns: [
        "<rootDir>/src/config/"
      ],
    testEnvironment: "node"
};
