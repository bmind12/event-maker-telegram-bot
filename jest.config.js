module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    testRegex: '\\.x?test\\.ts$',
    moduleFileExtensions: ['js', 'ts'],
    moduleDirectories: ['node_modules', 'src'],
};
