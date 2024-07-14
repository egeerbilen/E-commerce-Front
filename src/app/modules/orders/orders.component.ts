import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { urlEnums } from 'src/app/enums/url-enums';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { DecodedTokenWithJwtDto } from 'src/app/shared/dto/decoded-token-with-jwt-dto';
import { OrderDto } from 'src/app/shared/dto/order-dto';
import { ProductDto } from 'src/app/shared/dto/product-dto';
import { getUserData } from 'src/app/shared/ng-rx/selectors/user.selectors';
import { OrderProducService } from 'src/app/shared/services/orders-product/orders-product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  resolvedOrderData!: OrderDto[];
  resolvedOrderDetailsData: { [key: number]: ProductDto[] } = {};
  decodedToken: DecodedTokenWithJwtDto | null = null;
  urlEnums;

  /**
   * Constructor.
   * @param _route ActivatedRoute.
   * @param _store Store.
   * @param _ordersService OrdersService.
   */
  constructor(
    private _route: ActivatedRoute,
    private _store: Store,
    private _ordersService: OrderProducService
  ) {
    this.urlEnums = urlEnums;

    this._route.data.subscribe((data) => {
      console.log(data);
      this.resolvedOrderData = data?.['resolvedData'].data || [];
    });
    console.log(this.resolvedOrderData);

    this._store.select(getUserData).subscribe((res) => {
      this.decodedToken = res;
    });
  }

  /**
   * LoadOrderProducts.
   * @param orderId OrderId.
   */
  public loadOrderProducts(orderId: number): void {
    if (!this.resolvedOrderDetailsData[orderId]) {
      this._ordersService.getOrderProducts(orderId.toString()).subscribe((response: CustomResponseDto<ProductDto[]>) => {
        if (response.data) {
          this.resolvedOrderDetailsData[orderId] = response.data;
        } else {
          this.resolvedOrderDetailsData[orderId] = []; // response.data null ise boş array ata
        }
        console.log(response);
      });
    }
  }
}
