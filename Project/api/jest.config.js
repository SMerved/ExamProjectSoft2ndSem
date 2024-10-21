module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts?$': 'ts-jest', // Transform TypeScript files using ts-jest
    },
    moduleFileExtensions: ['ts', 'js'],
    testMatch: ['**/*.test.ts'], // Match TypeScript test files
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json', // Use the project's TypeScript config
        },
    },
};