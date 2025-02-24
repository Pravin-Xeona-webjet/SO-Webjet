module.exports = {
  rootDir: '../../',
  testEnvironmentOptions: {
    url: 'http://localhost/'
  },
  moduleDirectories: ['app', 'node_modules'],
  moduleNameMapper: {
    appConfig: '<rootDir>/src/sites/wjau/config.local.json'
  },
  globals: {
    window: {}
  },
  testPathIgnorePatterns: [
    '<rootDir>/cypress/'
  ]
}
