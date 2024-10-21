import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
    viewportWidth: 1750,
    viewportHeight: 1000,
    fixturesFolder: "cypress/fixtures",
  },
});
