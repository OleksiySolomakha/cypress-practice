const { defineConfig } = require("cypress");


function getEnvConfig(configFile) {
  return require(`./cypress.env.${configFile}.js`);
}

module.exports = {
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

      // підміняємо baseUrl
      config.baseUrl = envConfig.baseUrl;

      // додаємо env змінні
      config.env = {
        ...config.env,
        ...envConfig
      };
      return config;
    },
  },
};
