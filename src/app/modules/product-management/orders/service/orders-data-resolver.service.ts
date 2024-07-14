import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { urlEnums } from 'src/app/enums/url-enums';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { OrderProductDto } from 'src/app/shared/dto/order-product-dto';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersDataResolverService {
  urlEnums;
  /**
   * Constructor.
   * @param _router Route to url.
   * @param _ordersService OrdersService.
   */
  constructor(
    private _router: Router,
    private _ordersService: OrdersService
  ) {
    this.urlEnums = urlEnums;
  }

  /**
   * Data to be received when the module is opened.
   * @param route Route.
   * @returns Get products.
   */
  public resolve(route: ActivatedRouteSnapshot): Observable<CustomResponseDto<OrderProductDto>> {
    const id = route.paramMap.get('id') ?? '';

    if (!id) {
      this._router.navigate([this.urlEnums.notFoundPage]);
    }
    return this._ordersService.getUserOrders(id);
  }
}
