import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CustomResponseDto } from '../../dto/custom-response-dto';
import { ProductDto } from '../../dto/product-dto';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService extends BaseService {
  /**
   * IsFavoriteProduct.
   * @param userId UserId.
   * @param productId ProductId.
   * @returns Products favorite status.
   */
  public isFavoriteProduct(userId: number, productId: string): Observable<CustomResponseDto<boolean>> {
    if (userId === 0) {
      return of({ data: false } as CustomResponseDto<boolean>);
    } else {
      return this.http.get(this.apiEndpoint.favorite + 'IsFavoriteProduct/' + userId.toString() + '/' + productId);
    }
  }

  /**
   * Delete user by id.
   * @param productId ProductId.
   * @returns Resturn.
   */
  public deleteUserFavoriteProduct(productId: number): Observable<CustomResponseDto<null>> {
    const userId = this.userLocalStorageService.getUserId().toString();
    const url = `${this.apiEndpoint.favorite}DeleteUserFavoriteProduct/${userId}/${productId}`;

    return this.http.delete(url);
  }
  /**
   * CreateUserFavoriteProduct.
   * @param productId ProductId.
   * @returns Resturn.
   */
  public createUserFavoriteProduct(productId: number): Observable<CustomResponseDto<null>> {
    const url = this.apiEndpoint.favorite + 'CreateUserFavoriteProduct/';
    const userId = this.userLocalStorageService.getUserId().toString();
    const body = {
      userId: userId,
      productId: productId
    };
    return this.http.post(url, body);
  }

  /**
   * Get Products.
   * @returns Products values.
   */
  public getUserFavoritesProducts(): Observable<CustomResponseDto<ProductDto[]> | null> {
    if (!this.userLocalStorageService.getUserId()) {
      return of(null);
    }
    return this.http.get(this.apiEndpoint.favorite + 'GetUserFavoritesById/' + this.userLocalStorageService.getUserId().toString());
  }
}
