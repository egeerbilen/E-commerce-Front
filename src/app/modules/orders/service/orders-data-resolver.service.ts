import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { urlEnums } from 'src/app/enums/url-enums';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { OrderProductDto } from 'src/app/shared/dto/order-product-dto';
import { UserLocalStorageService } from 'src/app/shared/services/local-storage/user-local-storage.service';
import { OrderProducService } from 'src/app/shared/services/orders-product/orders-product.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersDataResolverService {
  urlEnums;
  /**
   * Constructor.
   * @param _router Route to url.
   * @param _ordersService OrdersService.
   * @param _userLocalStorageService UserLocalStorageService.
   */
  constructor(
    private _router: Router,
    private _ordersService: OrderProducService,
    private _userLocalStorageService: UserLocalStorageService
  ) {
    this.urlEnums = urlEnums;
  }

  /**
   * Data to be received when the module is opened.
   * @param route Route.
   * @returns Get products.
   */
  public resolve(route: ActivatedRouteSnapshot): Observable<CustomResponseDto<OrderProductDto>> {
    return this._ordersService.getUserOrders(this._userLocalStorageService.getUserId().toString());
  }
}
