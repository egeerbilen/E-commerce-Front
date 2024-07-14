import { Pipe, PipeTransform } from '@angular/core';
import { ProductDto } from 'src/app/shared/dto/product-dto';

@Pipe({
  name: 'findProduct'
})
export class FindProductPipe implements PipeTransform {
  /**
   * Transform.
   * @param products Products.
   * @param searchText SearchText.
   * @returns ProductDto.
   */
  public transform(products: ProductDto[], searchText: string): ProductDto[] {
    if (!products || products.length === 0) {
      return [];
    }

    if (!searchText || searchText.trim() === '') {
      return products;
    }

    const lowercasedSearchText = searchText.toLowerCase();

    return products.filter((product) => product.name.toLowerCase().includes(lowercasedSearchText));
  }
}
