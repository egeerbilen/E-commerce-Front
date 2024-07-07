import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { UserFavoritesProductsDto } from 'src/app/shared/dto/user-favorites-prodcut-dto';
import { apiEndpoint } from 'src/app/shared/enviroments/api-endpoint';
import { ApiHelperService } from 'src/app/shared/services/api-helper/api-helper.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesDataResolverService {
  /**
   * Constructor.
   * @param http Http Request Service.
   * @param _localStorageService LocalStorageService.
   */
  constructor(
    protected http: ApiHelperService,
    private _localStorageService: LocalStorageService
  ) {}

  /**
   * Data to be received when the module is opened.
   * @returns Get products.
   */
  public resolve(): Observable<CustomResponseDto<UserFavoritesProductsDto[]> | null> {
    return this.getUserFavorites();
  }

  /**
   * Get Products.
   * @returns Products values.
   */
  public getUserFavorites(): Observable<CustomResponseDto<UserFavoritesProductsDto[]> | null> {
    console.log(this._localStorageService.getUserId());
    if (!this._localStorageService.getUserId()) {
      console.log('!!!!! Cacheden local storage a yaz ordan çek kullanıcı giriş yapmadıysa');
      return of(null);
    }
    return this.http.get(apiEndpoint.userFavorites + 'GetUserFavoritesById/' + this._localStorageService.getUserId().toString());
  }
}
