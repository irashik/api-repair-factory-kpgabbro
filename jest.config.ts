import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  //"rootDir": "./",
    
  "testPathIgnorePatterns": [
    "./node_modules/",
    "./dist/",
    "./.dist"
  ],
  "verbose": true,

  
  modulePathIgnorePatterns: [
    "<rootDir>/dist",
    "<rootDir>/.dist",
    "<rootDir>/node_modules",
    
  ],
 
  

  "globals": {
    "__DEV__": true,
    "NODE_ENV": "test",
    "ENDPOINT": process.env.HTTP_HOST + ":" + process.env.HTTP_PORT
  },

  preset: "ts-jest",
  "testEnvironment": "node",
  "modulePaths": ["<rootDir>"],

  moduleNameMapper: {
    '^@App/(.*)$': '<rootDir>/src/$1',
    '^lib/(.*)$': '<rootDir>/common/$1',
  }


}
export default config;
