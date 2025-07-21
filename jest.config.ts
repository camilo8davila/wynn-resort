// jest.config.mjs
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  coverageProvider: 'v8',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^next/navigation$': '<rootDir>/__mocks__/next/navigation.ts',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(jose)/)',
    '/node_modules/(?!(node-fetch|data-uri-to-buffer|fetch-blob|web-streams-polyfill|formdata-polyfill)/)',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/', 
    '/.next/', 
    '/prisma/',
    '/dist/',  
    '/build/', 
    'generated/prisma/runtime',
    'generated/prisma'
  ]
};

export default createJestConfig(customJestConfig);
