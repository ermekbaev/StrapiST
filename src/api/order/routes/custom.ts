export default {
  routes: [
    {
      method: 'POST',
      path: '/orders/create-with-user',
      handler: 'order.createWithUser',
      config: {
        auth: false,
      },
    },
  ],
};