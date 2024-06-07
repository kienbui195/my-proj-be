module.exports = () => ({
  'crawler': {
    enabled: true,
    resolve: './src/plugins/crawler'
  },
  "users-permissions": {
    config: {
      register: {
        allowedFields: ["user_role"],
      },
    },
  },
});
