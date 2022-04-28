import type { Config } from '@jest/types';

const config: Config.InitialOptions = {

  moduleFileExtensions: ["js", "json", "ts"],

  testPathIgnorePatterns: [
    "./node_modules",
    "./dist",
    "./.dist"
  ],
  verbose: true,

  modulePathIgnorePatterns: [
    "<rootDir>/dist",
    "<rootDir>/.dist",
    "<rootDir>/node_modules",
  ],
  

  globals: {
    "__DEV__": true,
    NODE_ENV: "test2",
    "ENDPOINT": process.env.HTTP_HOST + ":" + process.env.HTTP_PORT
  },


  preset: "ts-jest",
  testEnvironment: "node",
  modulePaths: ["<rootDir>"],

  moduleNameMapper: {
    '^@App/(.*)$': '<rootDir>/src/$1',
    '^lib/(.*)$': '<rootDir>/common/$1',
  },

  
  //rootDir: "/",

  roots: [
    "<rootDir>/src",
    "<rootDir>/src/test"
  ],

  testRegex: ".e2e-spec.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  


 


};

export default config;