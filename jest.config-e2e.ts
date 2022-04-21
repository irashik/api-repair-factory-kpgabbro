import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  moduleFileExtensions: ["js", "json", "ts"],

  testPathIgnorePatterns: [
    "./node_modules",
    "./dist",
    "./.dist"
  ],


  
  
  rootDir: "./",

  roots: [
    "<rootDir>/src",
    "<rootDir>/src/test"
  ],

  testEnvironment: "node",
  testRegex: ".e2e-spec.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  

  modulePaths: ["<rootDir>"],

  moduleNameMapper: {
    '^@App/(.*)$': '<rootDir>/src/$1',
    '^lib/(.*)$': '<rootDir>/common/$1',
  }


};

export default config;