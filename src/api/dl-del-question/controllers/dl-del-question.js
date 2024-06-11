"use strict";

/**
 * A set of functions called "actions" for `dl-del-question`
 */

module.exports = {
  exampleAction: async (ctx, next) => {
    const { id } = ctx.params;
    try {
      if (!id)
        return ctx.send({ data: null, error: "Question id not found!" }, 400);
      const questionInfo = await strapi.entityService.findOne(
        "api::dl-question.dl-question",
        id,
        {
          populate: {
            answers: {
              fields: ["id"],
            },
          },
        }
      );

      if (questionInfo.answers.length > 0) {
        await Promise.all(
          questionInfo.answers.map(async (item, idx) => {
            await strapi.entityService.delete(
              "api::dl-answer.dl-answer",
              item.id
            );
          })
        );
      }

      return await strapi.entityService.delete(
        "api::dl-question.dl-question",
        id
      );
    } catch (err) {
      console.log('dl del question', err.message);
      ctx.send({
        data: null,
        error: err
      })
    }
  },
};
