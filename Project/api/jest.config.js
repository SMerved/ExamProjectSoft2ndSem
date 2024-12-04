/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+.(ts|tsx)$": "ts-jest",
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  setupFilesAfterEnv: ['<rootDir>/src/utilities/jestSetup.ts'],
  globalTeardown: '<rootDir>/src/utilities/jestGlobalTeardown.ts'
};
