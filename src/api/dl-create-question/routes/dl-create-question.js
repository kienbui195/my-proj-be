module.exports = {
  routes: [
    {
     method: 'POST',
     path: '/dl-create-question',
     handler: 'dl-create-question.exampleAction',
     config: {
       policies: [],
       middlewares: ["global::checkUserRoleAdmin"],
     },
    },
  ],
};
