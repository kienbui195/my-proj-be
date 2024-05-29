"use strict";

module.exports = ({ strapi }) => ({
  async index(ctx) {
    const { handler, payload } = ctx.request.body;

    try {
      if (handler) {
        const { data, error } = await strapi
          .service("plugin::crawler.crawler")
          [handler](payload);
        return ctx.send(
          {
            data,
            error,
          },
          error ? 400 : 200
        );
      }
      return ctx.send({
        data: null,
        error: "cannot detect handler!",
      });
    } catch (err) {
      return ctx.send(
        {
          data: null,
          error: err?.response?.data?.detail ?? err.message,
        },
        500
      );
    }
  },
});
