import { CategoryDto } from './category-dto';
import { ProductDto } from './product-dto';

export type CategoryWithProductsDto = CategoryDto & {
  products: ProductDto[];
};
