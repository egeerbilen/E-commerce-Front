import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { urlEnums } from 'src/app/enums/url-enums';
import { ProductDto } from 'src/app/shared/dto/product-dto';
import { getUserData } from 'src/app/shared/ng-rx/selectors/user.selectors';

import { BasketsService } from './service/baskets.service';

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.css']
})
export class BasketsComponent implements OnInit {
  resolvedBasketData!: ProductDto[];
  tokenStatus = false;
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
    private _basketService: BasketsService,
    private _router: Router
  ) {
    this.urlEnums = urlEnums;
    this._route.data.subscribe((data) => {
      this.resolvedBasketData = data?.['resolvedData']?.data || [];
    });

    this._store.select(getUserData).subscribe((res) => {
      this.tokenStatus = !!res; // res null, undefined, 0, "", false falsy olacak
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
    this._basketService.deleteUserBasketProduct(item.id).subscribe(() => {
      this.resolvedBasketData = this.resolvedBasketData.filter((fav) => fav !== item);
      this._calculateTotals(); // Totals'ı yeniden hesapla
    });
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
   * CalculateTotals.
   */
  private _calculateTotals(): void {
    this.totalPrice = this.resolvedBasketData.reduce((total, item) => total + item.price, 0);
    this.grandTotal = this.totalPrice + this.shippingCost - this.totalSavings;
  }
}
