module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    if (!ctx.state.user || ctx.state.user.user_role !== "admin")
      return ctx.send({ data: null, error: "No Permission!" }, 401);

    await next();
  };
};
