import { BaseDto } from './base-dto';

export type OrderDto = BaseDto & {
  userId: number;
  totalOrders: number;
  customerId: number;
  totalPrice: number;
};
