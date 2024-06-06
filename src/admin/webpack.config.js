"use strict";

/* eslint-disable no-unused-vars */
module.exports = {
  webpack: (config, webpack) => {
    // Add your variable using the DefinePlugin
    config.plugins.push(
      new webpack.DefinePlugin({
        //All your custom ENVs that you want to use in frontend
        CUSTOM_VARIABLES: {
          ZENROWS_APIKEY: JSON.stringify(process.env.ZENROWS_APIKEY),
          SCRAPINGANT_APIKEY: JSON.stringify(process.env.SCRAPINGANT_APIKEY),
        },
      })
    );
    // Important: return the modified config
    return config;
  },
};
