import { ProductDto } from './product-dto';

export type ProductWithQuantityDto = ProductDto & {
  numberOfProducts: number;
};
