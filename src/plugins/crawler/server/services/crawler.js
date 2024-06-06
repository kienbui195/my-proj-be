"use strict";

const axios = require("axios");

module.exports = ({ strapi }) => ({
  handleZenrows: async (payload) => {
    try {
      const { urlScrape, addOn, boostMode, outPut, apiKey } = payload;

      if (urlScrape === "") {
        return {
          data: null,
          error: "missing url_scrape!",
        };
      }

      const res = await axios.request({
        url: "https://api.zenrows.com/v1/",
        method: "GET",
        params: {
          url: urlScrape,
          apikey: apiKey !== "" ? apiKey : `${process.env.ZENROWS_APIKEY}`,
          premium_proxy: addOn ? "true" : "false",
          js_render: boostMode ? "true" : "false",
          autoparse: outPut === "html" ? "false" : "true",
        },
      });

      return {
        data: res.data,
        error: null,
      };
    } catch (err) {
      console.log("handleZenrows", err?.response?.data?.detail ?? err);
      return {
        data: null,
        error: err?.response?.data?.detail ?? err,
      };
    }
  },
});
