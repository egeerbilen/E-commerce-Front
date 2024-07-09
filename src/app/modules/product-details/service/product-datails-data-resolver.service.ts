import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, forkJoin, Observable, of } from 'rxjs';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { ProductDetailsDto } from 'src/app/shared/dto/product-details-dto';
import { ProductDto } from 'src/app/shared/dto/product-dto';
import { apiEndpoint } from 'src/app/shared/enviroments/api-endpoint';
import { getUserData } from 'src/app/shared/ng-rx/selectors/user.selectors';
import { ApiHelperService } from 'src/app/shared/services/api-helper/api-helper.service';

@Injectable({
  providedIn: 'root'
})
export class ProductDatailsDataResolverService {
  /**
   * Constructor.
   * @param _http Http Request Service.
   * @param _router Route to url.
   * @param _store UserLocalStorageService.
   */
  constructor(
    private _http: ApiHelperService,
    private _router: Router,
    private _store: Store
  ) {}

  /**
   * Data to be received when the module is opened.
   * @param route Route.
   * @returns Get products.
   */
  public resolve(route: ActivatedRouteSnapshot): Observable<ProductDetailsDto | boolean> {
    const productId = route.paramMap.get('id') ?? '';
    if (!productId) {
      this._router.navigate(['/404']);
    }

    let userId = 0;
    this._store.select(getUserData).subscribe((res) => {
      userId = res?.userId ?? 0;
    });

    // forkJoin, RxJS kütüphanesinde bulunan bir operatördür ve birden fazla observable'ın tamamlanmasını bekleyip,
    // tamamlandıklarında hepsinin son çıktısını tek bir observable olarak birleştiren bir işleve sahiptir.
    const resObject = forkJoin({
      getProductById: this.getProductById(productId),
      isFavoriteProduct: this.isFavoriteProduct(userId, productId)
    }).pipe(
      catchError((error) => {
        this._router.navigate(['/404']);
        return of(false);
      })
    );
    // pipe, RxJS (Reactive Extensions for JavaScript) kütüphanesinde bulunan bir fonksiyondur ve
    // bir observable üzerinde bir dizi operatörü sıralı olarak uygulamanıza olanak tanır. Bu sayede,
    // observable akışını çeşitli operatörlerle (örneğin map, filter, catchError gibi) dönüştürebilir ve işleyebilirsiniz.
    return resObject;
  }

  /**
   * Get Products.
   * @param productId String.
   * @returns Products values.
   */
  public getProductById(productId: string): Observable<CustomResponseDto<ProductDto>> {
    return this._http.get(apiEndpoint.product + 'GetById/' + productId);
  }

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
      return this._http.get(apiEndpoint.favorites + 'IsFavoriteProduct/' + userId.toString() + '/' + productId);
    }
  }
}
