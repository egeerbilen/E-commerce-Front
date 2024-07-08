import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { apiEndpoint } from 'src/app/shared/enviroments/api-endpoint';

import { FavoritesDataResolverService } from './favorites-data-resolver.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService extends FavoritesDataResolverService {
  /**
   * Delete user by id.
   * @param productId ProductId.
   * @returns Resturn.
   */
  public deleteUserFavoriteProduct(productId: number): Observable<CustomResponseDto<null>> {
    const userId = this.userLocalStorageService.getUserId().toString();
    const url = `${apiEndpoint.userFavorites}DeleteUserFavoriteProduct/${userId}/${productId}`;

    return this.http.delete(url);
  }
  /**
   * CreateUserFavoriteProduct.
   * @param productId ProductId.
   * @returns Resturn.
   */
  public createUserFavoriteProduct(productId: number): Observable<CustomResponseDto<null>> {
    const url = `${apiEndpoint.userFavorites}UserFavorites/`;
    const userId = this.userLocalStorageService.getUserId().toString();
    const body = {
      userId: userId,
      productId: productId
    };
    return this.http.post(url, body);
  }
}
