// src/api/order/controllers/order.ts
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::order.order', ({ strapi }) => ({
  
  // Кастомный метод для создания заказа с пользователем
  async createWithUser(ctx) {
    try {
      const { userToken, ...orderData } = ctx.request.body;
      
      let userId = null;
      
      // Если есть токен - получаем пользователя
      if (userToken) {
        try {
          const user = await strapi.plugins['users-permissions'].services.jwt.verify(userToken);
          userId = user.id;
          console.log('Пользователь найден:', user.email);
        } catch (error) {
          console.warn('Невалидный токен:', error);
        }
      }
      
      // Добавляем пользователя к данным заказа
      if (userId) {
        orderData.user = userId;
      }
      
      // Создаем заказ с правами админа
      const result = await strapi.entityService.create('api::order.order', {
        data: orderData
      });
      
      return { data: result };
      
    } catch (error) {
      ctx.throw(500, error);
    }
  }
  
}));