import { BasketProductDto } from './basket-product-dto';
import { CustomResponseDto } from './custom-response-dto';
import { ProductDto } from './product-dto';

export type ProductDetailsDto = {
  getProductById: CustomResponseDto<ProductDto>;
  isFavoriteProduct: CustomResponseDto<boolean>;
  isBasketProduct: CustomResponseDto<BasketProductDto | null>;
};
