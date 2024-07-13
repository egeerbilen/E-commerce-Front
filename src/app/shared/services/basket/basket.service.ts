import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CustomResponseDto } from '../../dto/custom-response-dto';
import { ProductDto } from '../../dto/product-dto';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService extends BaseService {
  /**
   * Delete user by id.
   * @param productId ProductId.
   * @returns Resturn.
   */
  public deleteUserBasketProduct(productId: number): Observable<CustomResponseDto<null>> {
    const userId = this.userLocalStorageService.getUserId().toString();
    const url = this.apiEndpoint.basketProduct + 'DeleteBasketProduct/' + 'userId/' + userId + '/products/' + productId;

    return this.http.delete(url);
  }

  /**
   * CreateBasketProduct.
   * @param productId ProductId.
   * @returns Resturn.
   */
  public createBasketProduct(productId: number): Observable<CustomResponseDto<null>> {
    const url = this.apiEndpoint.basketProduct + 'CreateBasketProduct';
    const userId = this.userLocalStorageService.getUserId().toString();
    const body = {
      basketId: Number(userId),
      productId: productId
    };
    return this.http.post(url, body);
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
}
