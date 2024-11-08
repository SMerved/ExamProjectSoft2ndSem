/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+.(ts|tsx)$": "ts-jest",
  },
  forceExit: true,
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
};
