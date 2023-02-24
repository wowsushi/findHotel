import { OrdersMiddleware } from './orders.middleware';

describe('OrdersMiddleware', () => {
  it('should be defined', () => {
    expect(new OrdersMiddleware()).toBeDefined();
  });
});
