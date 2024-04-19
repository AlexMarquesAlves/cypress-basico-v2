const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // baseUrl:'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html',
    // pluginsFile: false,
    viewportHeight: 880,
    viewportWidth: 1280,
  },
});
