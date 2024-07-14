import { OrderProductDto } from './order-product-dto';

export type OrderDto = {
  totalOrders: number;
  customerId: number;
  orderProducts: OrderProductDto[];
};
