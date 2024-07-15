import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BasketProductDto } from '../../dto/basket-product-dto';
import { CustomResponseDto } from '../../dto/custom-response-dto';
import { ProductDto } from '../../dto/product-dto';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class BasketProdcutService extends BaseService {
  /**
   * Update Basket Product.
   * @param basketProduct BasketProductDto.
   * @returns Response.
   */
  public updateBasketProduct(basketProduct: BasketProductDto): Observable<CustomResponseDto<null>> {
    const url = this.apiEndpoint.basketProduct + 'UpdateBasketProduct';
    return this.http.put(url, basketProduct);
  }

  /**
   * Get Products.
   * @returns Products values.
   */
  public getUserBasketProducts(): Observable<CustomResponseDto<ProductDto[]> | null> {
    if (!this.userLocalStorageService.getUserId()) {
      return of(null);
    }
    return this.http.get(this.apiEndpoint.basketProduct + 'GetUserBasketsById/' + this.userLocalStorageService.getUserId().toString());
  }

  /**
   * Check if a product is in the basket.
   * @param basketId Basket ID.
   * @param productId Product ID.
   * @returns Response.
   */
  public isProductInBasket(basketId: number, productId: string): Observable<CustomResponseDto<BasketProductDto>> {
    const url = this.apiEndpoint.basketProduct + 'IsProductInBasket/' + basketId.toString() + '/products/' + productId;

    return this.http.get(url);
  }
}
