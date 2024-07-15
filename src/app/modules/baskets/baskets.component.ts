import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { urlEnums } from 'src/app/enums/url-enums';
import { ToastService } from 'src/app/helpers/toast/toast.service';
import { BasketProductDto } from 'src/app/shared/dto/basket-product-dto';
import { DecodedTokenWithJwtDto } from 'src/app/shared/dto/decoded-token-with-jwt-dto';
import { OrderDto } from 'src/app/shared/dto/order-dto';
import { OrderProductDto } from 'src/app/shared/dto/order-product-dto';
import { ProductWithQuantityDto } from 'src/app/shared/dto/product-with-quantity-dto';
import { getUserData } from 'src/app/shared/ng-rx/selectors/user.selectors';
import { BasketService } from 'src/app/shared/services/basket/basket.service';
import { OrderProducService } from 'src/app/shared/services/orders-product/orders-product.service';
import { OrderService } from 'src/app/shared/services/oreder/oreder.service';

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.css']
})
export class BasketsComponent implements OnInit {
  resolvedBasketData!: ProductWithQuantityDto[];
  decodedToken: DecodedTokenWithJwtDto | null = null;
  totalPrice = 0;
  shippingCost = 39.99;
  totalSavings = 4.01;
  grandTotal = 0;
  urlEnums;

  /**
   * Constructor.
   * @param _route ActivatedRoute.
   * @param _store Store.
   * @param _basketService FavoriteService.
   * @param _router Router.
   * @param _toastService ToastService.
   * @param _orderProducService OrderProducService.
   * @param _orderService OrderService.
   */
  constructor(
    private _route: ActivatedRoute,
    private _store: Store,
    private _basketService: BasketService,
    private _router: Router,
    private _toastService: ToastService,
    private _orderProducService: OrderProducService,
    private _orderService: OrderService
  ) {
    this.urlEnums = urlEnums;
    this._route.data.subscribe((data) => {
      this.resolvedBasketData = data?.['resolvedData']?.data || [];
    });

    this._store.select(getUserData).subscribe((res) => {
      this.decodedToken = res;
    });
  }

  /**
   * NgOnInit.
   */
  public ngOnInit(): void {
    this._calculateTotals();
  }

  /**
   * RemoveFromBasket.
   * @param item Item.
   */
  public removeFromBasket(item: ProductWithQuantityDto): void {
    item.numberOfProducts = 0;
    this._updateBasketProduct(item, true);
  }

  /**
   * NavigateToProductDetails.
   * @param productId ProductId.
   */
  public navigateToProductDetails(productId: number): void {
    this._router.navigate([this.urlEnums.productDetails, productId]);
  }

  /**
   * ConfirmBasket.
   */
  public confirmBasket(): void {
    console.log(this.resolvedBasketData);
    if (!this.resolvedBasketData || this.resolvedBasketData.length === 0) {
      this._toastService.show('Basket is empty. No request will be made.');
      return;
    }

    const order: OrderDto[] = [];
    this.resolvedBasketData.forEach((item) => {
      order.push({
        id: 0,
        userId: item.userId, // sipariş oluşturulacak kişi
        customerId: this.decodedToken!.userId,
        totalOrders: this.resolvedBasketData.length,
        totalPrice: this.totalPrice // hesaplanacak
      });
    });

    this._orderService.createList(order).subscribe((res) => {
      if (res) {
        res.data?.forEach((item) => {
          orderProductDtos.forEach((x) => {
            x.orderId = item;
          });
        });
        const orderProductDtos = this._mapToOrderProductDto(this.resolvedBasketData);
        this._orderProducService.createOrderProduct(orderProductDtos).subscribe();
      }
    });
  }

  /**
   * IncreaseQuantity.
   * @param item Item.
   */
  public increaseQuantity(item: ProductWithQuantityDto): void {
    item.numberOfProducts++;
    this._updateBasketProduct(item);
    this._calculateTotals();
  }
  /**
   * DecreaseQuantity.
   * @param item Item.
   */
  public decreaseQuantity(item: ProductWithQuantityDto): void {
    if (item.numberOfProducts > 1) {
      item.numberOfProducts--;
      this._updateBasketProduct(item);
      this._calculateTotals();
    }
  }
  /**
   * MapToOrderProductDto.
   * @param basketData BasketData.
   * @returns Return.
   */
  private _mapToOrderProductDto(basketData: ProductWithQuantityDto[]): OrderProductDto[] {
    return basketData.map((item) => ({
      orderId: 0,
      productId: item.id,
      numberOfProducts: item.numberOfProducts
    }));
  }

  /**
   * UpdateBasketProduct.
   * @param item Item.
   * @param remove Whether to remove the item from the basket list.
   */
  private _updateBasketProduct(item: ProductWithQuantityDto, remove = false): void {
    const basketProduct: BasketProductDto = {
      basketId: this.decodedToken!.basketId,
      productId: item.id.toString(),
      numberOfProducts: item.numberOfProducts // Kullanıcıdan alınan ürün miktarı.
    };
    this._basketService.updateBasketProduct(basketProduct).subscribe((res) => {
      if (res.errors) {
        this._toastService.show('Product is already in the basket');
      } else {
        if (remove) {
          this.resolvedBasketData = this.resolvedBasketData.filter((fav) => fav !== item);
          this._calculateTotals();
          this._toastService.show('Product removed from basket');
        } else {
          this._toastService.show('Product quantity has been changed');
        }
      }
    });
  }

  /**
   * CalculateTotals.
   */
  private _calculateTotals(): void {
    if (this.resolvedBasketData.length === 0) {
      this.totalPrice = 0;
      this.grandTotal = 0;
    } else {
      this.totalPrice = this.resolvedBasketData.reduce((total, item) => total + item.price * item.numberOfProducts, 0);
      this.grandTotal = this.totalPrice + this.shippingCost - this.totalSavings;
    }
  }
}
