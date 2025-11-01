const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '6ccdud',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'tests/**/*.cy.{js,jsx,ts,tsx}'
  },
});
