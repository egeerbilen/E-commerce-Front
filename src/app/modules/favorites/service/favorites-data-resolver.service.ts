import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { ProductDto } from 'src/app/shared/dto/product-dto';
import { apiEndpoint } from 'src/app/shared/enviroments/api-endpoint';
import { ApiHelperService } from 'src/app/shared/services/api-helper/api-helper.service';
import { UserLocalStorageService } from 'src/app/shared/services/local-storage/user-local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesDataResolverService {
  /**
   * Constructor.
   * @param http Http Request Service.
   * @param userLocalStorageService LocalStorageService.
   */
  constructor(
    protected http: ApiHelperService,
    protected userLocalStorageService: UserLocalStorageService
  ) {}

  /**
   * Data to be received when the module is opened.
   * @returns Get products.
   */
  public resolve(): Observable<CustomResponseDto<ProductDto[]> | null> {
    return this.getUserProducts();
  }

  /**
   * Get Products.
   * @returns Products values.
   */
  public getUserProducts(): Observable<CustomResponseDto<ProductDto[]> | null> {
    if (!this.userLocalStorageService.getUserId()) {
      console.log('!!!!! Cacheden local storage a yaz ordan çek kullanıcı giriş yapmadıysa');
      return of(null);
    }
    return this.http.get(apiEndpoint.userFavorites + 'GetUserFavoritesById/' + this.userLocalStorageService.getUserId().toString());
  }
}
