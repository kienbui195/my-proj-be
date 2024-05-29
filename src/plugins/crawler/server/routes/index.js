
module.exports = {
  admin: {
    type: "admin",
    routes: [
      {
        method: "POST",
        path: "/view-data",
        handler: "crawler.index",
        config: {
          policies: [],
        },
      },
    ],
  },
  "content-api": {
    type: "content-api",
    routes: [
      {
        method: "POST",
        path: "/view-data",
        handler: "crawler.index",
        config: {
          policies: [],
        },
      },
    ],
  },
};
