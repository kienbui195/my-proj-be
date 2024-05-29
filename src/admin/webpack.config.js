'use strict';

/* eslint-disable no-unused-vars */
module.exports = (config, webpack) => {
  // Note: we provide webpack above so you should not `require` it
  // Perform customizations to webpack config
  // Important: return the modified config
  config.plugins.EnvironmentPlugin('ZENROWS_APIKEY', 'SCRAPINGANT_APIKEY')

  return config;
};
