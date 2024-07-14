import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { catchError, forkJoin, Observable, of } from 'rxjs';
import { urlEnums } from 'src/app/enums/url-enums';
import { ProductDetailsDto } from 'src/app/shared/dto/product-details-dto';
import { BasketService } from 'src/app/shared/services/basket/basket.service';
import { FavoriteService } from 'src/app/shared/services/favorite/favorite.service';
import { UserLocalStorageService } from 'src/app/shared/services/local-storage/user-local-storage.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductDatailsDataResolverService {
  urlEnums;

  /**
   * Constructor.
   * @param _router Route to url.
   * @param _userLocalStorageService UserLocalStorageService.
   * @param _favoriteService FavoriteService.
   * @param _productService ProductService.
   * @param _basketService BasketService.
   */
  constructor(
    private _router: Router,
    private _userLocalStorageService: UserLocalStorageService,
    private _favoriteService: FavoriteService,
    private _productService: ProductService,
    private _basketService: BasketService
  ) {
    this.urlEnums = urlEnums;
  }

  /**
   * Data to be received when the module is opened.
   * @param route Route.
   * @returns Get products.
   */
  public resolve(route: ActivatedRouteSnapshot): Observable<ProductDetailsDto | boolean> {
    const productId = route.paramMap.get('id') ?? '';
    if (!productId) {
      this._router.navigate([this.urlEnums.notFoundPage]);
    }

    // forkJoin, RxJS kütüphanesinde bulunan bir operatördür ve birden fazla observable'ın tamamlanmasını bekleyip,
    // tamamlandıklarında hepsinin son çıktısını tek bir observable olarak birleştiren bir işleve sahiptir.
    const resObject = forkJoin({
      getProductById: this._productService.getProductById(productId),
      isFavoriteProduct: this._favoriteService.isFavoriteProduct(this._userLocalStorageService.getUserId(), productId),
      isBasketProduct: this._basketService.isProductInBasket(this._userLocalStorageService.getUserId(), productId)
    }).pipe(
      catchError((error) => {
        this._router.navigate([this.urlEnums.notFoundPage]);
        return of(false);
      })
    );
    // pipe, RxJS (Reactive Extensions for JavaScript) kütüphanesinde bulunan bir fonksiyondur ve
    // bir observable üzerinde bir dizi operatörü sıralı olarak uygulamanıza olanak tanır. Bu sayede,
    // observable akışını çeşitli operatörlerle (örneğin map, filter, catchError gibi) dönüştürebilir ve işleyebilirsiniz.
    return resObject;
  }
}
