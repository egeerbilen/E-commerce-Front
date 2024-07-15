import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { urlEnums } from 'src/app/enums/url-enums';
import { ToastService } from 'src/app/helpers/service/toast/toast.service';
import { SignalrService } from 'src/app/helpers/signalr/signalr.service';
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
export class OrdersComponent implements OnDestroy {
  resolvedOrderData!: OrderDto[];
  resolvedOrderDetailsData: { [key: number]: ProductDto[] } = {};
  decodedToken: DecodedTokenWithJwtDto | null = null;
  urlEnums;
  private _subscriptions: Subscription = new Subscription();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  private _receiveMessage = (user: string, message: string) => {
    const mes = user + ': ' + message;
    this._toastService.show(mes);
  };

  /**
   * Constructor.
   * @param _route ActivatedRoute.
   * @param _store Store.
   * @param _ordersService OrdersService.
   * @param _signalrService SignalrService.
   * @param _toastService ToastService.
   */
  constructor(
    private _route: ActivatedRoute,
    private _store: Store,
    private _ordersService: OrderProducService,
    private _signalrService: SignalrService,
    private _toastService: ToastService
  ) {
    this.urlEnums = urlEnums;

    this._subscriptions.add(
      this._route.data.subscribe((data) => {
        this.resolvedOrderData = data?.['resolvedData'].data || [];
      })
    );

    this._subscriptions.add(
      this._store.select(getUserData).subscribe((res) => {
        this.decodedToken = res;
      })
    );

    this._signalrService.addReceiveMessageListener(this._receiveMessage);
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
          this.resolvedOrderDetailsData[orderId] = [];
        }
      });
    }
  }

  /**
   * NgOnDestroy.
   */
  public ngOnDestroy(): void {
    this._signalrService.removeReceiveMessageListener(this._receiveMessage);
    this._subscriptions.unsubscribe();
  }
}
