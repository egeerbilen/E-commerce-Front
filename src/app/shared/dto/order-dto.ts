import { BaseDto } from './base-dto';
import { OrderProductDto } from './order-product-dto';

export type OrderDto = BaseDto & {
  totalOrders: number;
  customerId: number;
  totalPrice: number;
  orderProducts: OrderProductDto[];
};
