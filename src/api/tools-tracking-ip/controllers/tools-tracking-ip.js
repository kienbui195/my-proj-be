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
        // @ts-ignore
        const ip = ctx.headers["x-forwarded-for"] || ctx.socket.remoteAddress;

        const existIp = await strapi.entityService.findMany(
          "api::tools-tracking-ip.tools-tracking-ip",
          {
            filters: {
              ip_address: `${ip}`,
            },
          }
        );

        if (existIp.length > 0) {
          await strapi.entityService.update(
            "api::tools-tracking-ip.tools-tracking-ip",
            existIp[0].id,
            {
              data: {
                views: existIp[0].views + 1,
                history:
                  existIp[0].history +
                  `\n[${new Date()}]: ${ctx.request.header["user-agent"]}`,
              },
            }
          );
        } else {
          await strapi.entityService.create(
            "api::tools-tracking-ip.tools-tracking-ip",
            {
              data: {
                ip_address: `${ip}`,
                views: 1,
                history: `[${new Date()}]: ${ctx.request.header["user-agent"]}`,
              },
            }
          );
        }
        return ctx.send("ok");
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
