// src/api/order/routes/custom-order.ts
export default {
  routes: [
    {
      method: 'POST',
      path: '/orders/create-with-user',
      handler: 'order.createWithUser',
      config: {
        auth: false, // Публичный доступ
      },
    },
  ],
};