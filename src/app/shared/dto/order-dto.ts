import { OrderProductDto } from './order-product-dto';

export type OrderDto = {
  totalOrders: number;
  customerId: number;
  totalPrice: number;
  orderProducts: OrderProductDto[];
};
