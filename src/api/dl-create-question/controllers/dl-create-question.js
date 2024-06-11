"use strict";

/**
 * A set of functions called "actions" for `dl-create-question`
 */

module.exports = {
  exampleAction: async (ctx, next) => {
    const { imageId = 0 } = ctx.query;
    const { question, answers = [] } = ctx.request.body.data;
    try {
      if (!question || !answers || answers.length < 1) {
        return ctx.send(
          {
            data: null,
            error: "question or answers info are required",
          },
          400
        );
      }
      const { question: ques, pp, categoryId } = question;

      const questionInfo = await strapi.entityService.create(
        "api::dl-question.dl-question",
        {
          data: {
            question: ques,
            paralyzed_point: pp,
            ...(categoryId ? { category: categoryId } : {}),
            ...(imageId ? { images: imageId } : {}),
            publishedAt: Date.now(),
          },
        }
      );

      const answersId = await Promise.all(
        answers.map(async (answerItem, idx) => {
          const answerInfo = await strapi.entityService.create(
            "api::dl-answer.dl-answer",
            {
              data: {
                answer: answerItem.content,
                correct_answer: answerItem.correct_answer,
                desc: answerItem.desc,
                publishedAt: Date.now(),
              },
            }
          );

          return answerInfo.id;
        })
      );

      return ctx.send({
        data: await strapi.entityService.update(
          "api::dl-question.dl-question",
          questionInfo.id,
          {
            data: {
              answers: {
                connect: answersId,
              },
            },
          }
        ),
        error: null,
      });
    } catch (err) {
      console.log("dl create question", err.message);
      ctx.send({
        data: null,
        error: err,
      });
    }
  },
};
