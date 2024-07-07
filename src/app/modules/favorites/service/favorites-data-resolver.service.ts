import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { UserFavoritesProductsDto } from 'src/app/shared/dto/user-favorites-prodcut-dto';
import { apiEndpoint } from 'src/app/shared/enviroments/api-endpoint';
import { ApiHelperService } from 'src/app/shared/services/api-helper/api-helper.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesDataResolverService {
  /**
   * Constructor.
   * @param http Http Request Service.
   */
  constructor(protected http: ApiHelperService) {}

  /**
   * Data to be received when the module is opened.
   * @returns Get products.
   */
  public resolve(): Observable<CustomResponseDto<UserFavoritesProductsDto[]>> {
    return this.getUserFavorites();
  }

  /**
   * Get Products.
   * @returns Products values.
   */
  public getUserFavorites(): Observable<CustomResponseDto<UserFavoritesProductsDto[]>> {
    console.log('!!!!! getUserFavorites');
    return this.http.get(apiEndpoint.product + 'CreateUserBasketProduct');
  }
}
