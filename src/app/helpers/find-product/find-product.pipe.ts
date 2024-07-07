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
    if (!products) return [];
    if (!searchText) return products;
    searchText = searchText.toLowerCase();
    return products.filter((product) => product.name.toLowerCase().includes(searchText));
  }
}
