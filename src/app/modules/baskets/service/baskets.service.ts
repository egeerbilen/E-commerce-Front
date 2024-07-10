import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { apiEndpoint } from 'src/app/shared/enviroments/api-endpoint';

import { BasketDataResolverService } from './basket-data-resolver.service';

@Injectable({
  providedIn: 'root'
})
export class BasketsService extends BasketDataResolverService {
  /**
   * Delete user by id.
   * @param productId ProductId.
   * @returns Resturn.
   */
  public deleteUserBasketProduct(productId: number): Observable<CustomResponseDto<null>> {
    const userId = this.userLocalStorageService.getUserId().toString();
    const url = `${apiEndpoint.basket}DeleteUserBasketProduct/${userId}/${productId}`;

    return this.http.delete(url);
  }
  /**
   * CreateUserBasketProduct.
   * @param productId ProductId.
   * @returns Resturn.
   */
  public createUserBasketProduct(productId: number): Observable<CustomResponseDto<null>> {
    const url = apiEndpoint.basket + 'CreateUserBasketProduct/';
    const userId = this.userLocalStorageService.getUserId().toString();
    const body = {
      userId: userId,
      productId: productId
    };
    return this.http.post(url, body);
  }
}
