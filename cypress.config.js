const { defineConfig } = require("cypress");
const path = require("path");

function getEnvConfig(configFile) {
  try {
    return require(`./cypress.env.${configFile}.js`);
  } catch {
    console.warn(`Env file cypress.env.${configFile}.js not found, using defaults.`);
    return {};
  }
}

module.exports = defineConfig({
  watchForFileChanges: false,
  allowCypressEnv: true,
  defaultCommandTimeout: 10000,
  viewportWidth: 1280,
  viewportHeight: 720,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/report',
    reportFilename: '[status]_[datetime]-[name]-report',
    timestamp: "shortDate",
    html: false,
    json: true,
    overwrite: false,
    quiet: true
  },

  e2e: {
    specPattern: '**/*.spec.js',
    setupNodeEvents(on, config) {
      const configFile = config.env.configFile || 'stage';
      const envConfig = getEnvConfig(configFile);

      if (envConfig.baseUrl) config.baseUrl = envConfig.baseUrl;

      config.env = {
        ...config.env,
        ...envConfig
      };

      return config;
    },
  },
});