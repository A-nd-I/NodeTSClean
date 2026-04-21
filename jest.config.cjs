/** @type {import('jest').Config} */
module.exports = {
   clearMocks: true,
   collectCoverage: false,
   coverageDirectory: 'coverage',
   coverageProvider: 'v8',
   moduleNameMapper: {
      '^(\\.{1,2}/.*)\\.js$': '$1',
      '^#(.+)\\.js$': '<rootDir>/src/$1.ts',
   },
   preset: 'ts-jest/presets/default-esm',
   roots: ['<rootDir>/src'],
   testEnvironment: 'node',
   testMatch: ['**/*.spec.ts', '**/*.test.ts'],
};
