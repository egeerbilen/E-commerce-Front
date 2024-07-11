import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastService } from 'src/app/helpers/toast/toast.service';
import { ProductDetailsDto } from 'src/app/shared/dto/product-details-dto';
import { ProductDto } from 'src/app/shared/dto/product-dto';
import { getUserData } from 'src/app/shared/ng-rx/selectors/user.selectors';
import { LoadingPageService } from 'src/app/shared/services/loading-page/loading-page.service';

import { BasketsService } from '../baskets/service/baskets.service';
import { FavoriteService } from '../favorites/service/favorite.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  resolvedData!: ProductDetailsDto;
  product!: ProductDto;
  tokenStatus = false;
  isFavorite = false;

  /**
   * Constructor.
   * @param _route ActivatedRoute.
   * @param _store Store.
   * @param _loadingPageService LoadingPageService.
   * @param _favoriteService FavoriteService.
   * @param _basketsService BasketsService.
   * @param _toastService ToastService.
   */
  constructor(
    private _route: ActivatedRoute,
    private _store: Store,
    private _loadingPageService: LoadingPageService,
    private _favoriteService: FavoriteService,
    private _basketsService: BasketsService,
    private _toastService: ToastService
  ) {
    this._loadingPageService.show();
    this._route.data.subscribe((data) => {
      this.resolvedData = data['resolvedData'];
      console.log(this.resolvedData);
      if (this.resolvedData.getProductById.data) {
        this.product = this.resolvedData.getProductById.data;
      }

      if (this.resolvedData.isFavoriteProduct.data) {
        this.isFavorite = this.resolvedData.isFavoriteProduct.data;
      }
    });

    this._store.select(getUserData).subscribe((res) => {
      this.tokenStatus = !!res; // res null, undefined, 0, "", false falsy olacak
    });
    this._loadingPageService.hide();
  }

  /**
   * AddToBasket.
   */
  public addToBasket(): void {
    this._loadingPageService.show();
    this._basketsService.createBasketProduct(this.product.id).subscribe((res) => {
      if (res.errors) {
        this._toastService.show('Product is already in the basket');
      } else {
        this._toastService.show('Product added to basket');
      }
    });

    this._loadingPageService.hide();
  }

  /**
   * AddToFavorites.
   */
  public addToFavorites(): void {
    this._loadingPageService.show();
    this.isFavorite = !this.isFavorite;
    if (this.isFavorite) {
      this._favoriteService.createUserFavoriteProduct(this.product.id).subscribe();
    } else {
      this._favoriteService.deleteUserFavoriteProduct(this.product.id).subscribe();
    }
    this._loadingPageService.hide();
  }
}
