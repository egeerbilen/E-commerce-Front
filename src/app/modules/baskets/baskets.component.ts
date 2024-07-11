import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductDto } from 'src/app/shared/dto/product-dto';
import { getUserData } from 'src/app/shared/ng-rx/selectors/user.selectors';

import { BasketsService } from './service/baskets.service';

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.css']
})
export class BasketsComponent {
  resolvedBasketData!: ProductDto[];
  tokenStatus = false;

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
    this._route.data.subscribe((data) => {
      this.resolvedBasketData = data?.['resolvedData']?.data || [];
    });

    this._store.select(getUserData).subscribe((res) => {
      this.tokenStatus = !!res; // res null, undefined, 0, "", false falsy olacak
    });
  }

  /**
   * RemoveFromBasket.
   * @param item Item.
   */
  public removeFromBasket(item: ProductDto): void {
    this._basketService.deleteUserBasketProduct(item.id).subscribe(() => {
      this.resolvedBasketData = this.resolvedBasketData.filter((fav) => fav !== item);
    });
  }

  /**
   * NavigateToProductDetails.
   * @param productId ProductId.
   */
  public navigateToProductDetails(productId: number): void {
    this._router.navigate(['ProductDetails', productId]);
  }
}
