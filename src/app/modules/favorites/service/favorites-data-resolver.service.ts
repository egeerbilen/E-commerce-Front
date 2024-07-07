import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { ProductDto } from 'src/app/shared/dto/product-dto';
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
   * @param localStorageService LocalStorageService.
   */
  constructor(
    protected http: ApiHelperService,
    protected localStorageService: LocalStorageService
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
    if (!this.localStorageService.getUserId()) {
      console.log('!!!!! Cacheden local storage a yaz ordan çek kullanıcı giriş yapmadıysa');
      return of(null);
    }
    return this.http.get(apiEndpoint.product + 'GetUserProducts/' + this.localStorageService.getUserId().toString());
  }
}
