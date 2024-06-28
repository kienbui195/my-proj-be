module.exports = {
  routes: [
    {
      method: "POST",
      path: "/tools/tracking-ip",
      handler: "tools-tracking-ip.handleTracingIPAddress",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
