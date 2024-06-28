"use strict";
/**
 * tools-tracking-ip controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::tools-tracking-ip.tools-tracking-ip",
  ({ strapi }) => ({
    handleTracingIPAddress: async (ctx) => {
      try {
        const date = ctx.request.body.data;
        const ip = ctx.headers["x-forwarded-for"] || ctx.socket.remoteAddress;
        let res;

        const existIp = await strapi.entityService.findMany(
          "api::tools-tracking-ip.tools-tracking-ip",
          {
            filters: {
              ip_address: `${ip}`,
            },
          }
        );

        if (existIp.length > 0) {
          res = await strapi.entityService.update(
            "api::tools-tracking-ip.tools-tracking-ip",
            existIp[0].id,
            {
              data: {
                views: existIp[0].views + 1,
                history: existIp[0].history + `\n[${date}]: ${ctx.request.header["user-agent"]}`,
              },
            }
          );
        } else {
          res = await strapi.entityService.create(
            "api::tools-tracking-ip.tools-tracking-ip",
            {
              data: {
                ip_address: `${ip}`,
                views: 1,
                history: `[${date}]: ${ctx.request.header["user-agent"]}`,
              },
            }
          );
        }
        ctx.send('ok');
      } catch (error) {
        ctx.send(
          {
            data: null,
            error,
          },
          500
        );
      }
    },
  })
);
