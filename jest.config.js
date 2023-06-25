module.exports = {
  preset: 'ts-jest',
  /** not "node" otherwise "document is not defined" will occur in jest */
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    /** So that css modules work with jest */
    '.+\\.css$': '<rootDir>/node_modules/jest-css-modules-transform',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};