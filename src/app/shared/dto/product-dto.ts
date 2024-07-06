import { BaseDto } from './base-dto';
import { ProductDetailsDto } from './product-details-dto';

export type ProductDto = BaseDto & {
  imageData: string;
  name: string;
  stock: number;
  price: number;
  categoryId: number;
  productDetails: ProductDetailsDto;
};
