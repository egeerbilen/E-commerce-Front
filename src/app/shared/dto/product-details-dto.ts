import { BaseDto } from './base-dto';

export type ProductDetailsDto = BaseDto & {
  name: string;
  description?: string;
  stock: number;
  price: number;
  productId: number;
};
