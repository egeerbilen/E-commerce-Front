import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { urlEnums } from 'src/app/enums/url-enums';
import { DecodedTokenWithJwtDto } from 'src/app/shared/dto/decoded-token-with-jwt-dto';
import { ProductDto } from 'src/app/shared/dto/product-dto';
import { ProductWithQuantityDto } from 'src/app/shared/dto/product-with-quantity-dto';
import { getUserData } from 'src/app/shared/ng-rx/selectors/user.selectors';
import { BasketService } from 'src/app/shared/services/basket/basket.service';

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
   */
  constructor(
    private _route: ActivatedRoute,
    private _store: Store,
    private _basketService: BasketService,
    private _router: Router
  ) {
    this.urlEnums = urlEnums;
    this._route.data.subscribe((data) => {
      this.resolvedBasketData = data?.['resolvedData']?.data || [];
      console.log(this.resolvedBasketData);
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
  public removeFromBasket(item: ProductDto): void {
    // this._basketService.updateBasketProduct().subscribe(() => {
    //   this.resolvedBasketData = this.resolvedBasketData.filter((fav) => fav !== item);
    //   this._calculateTotals(); // Totals'ı yeniden hesapla
    // });
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
    console.log('Basket confirmed.');
  }

  /**
   * IncreaseQuantity.
   * @param item Item.
   */
  public increaseQuantity(item: ProductWithQuantityDto): void {
    item.numberOfProducts++;
    this._calculateTotals();
  }

  /**
   * DecreaseQuantity.
   * @param item Item.
   */
  public decreaseQuantity(item: ProductWithQuantityDto): void {
    if (item.numberOfProducts > 1) {
      item.numberOfProducts--;
      this._calculateTotals();
    }
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
