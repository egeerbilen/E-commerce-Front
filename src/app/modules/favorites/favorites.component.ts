import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { urlEnums } from 'src/app/enums/url-enums';
import { ProductDto } from 'src/app/shared/dto/product-dto';
import { getUserData } from 'src/app/shared/ng-rx/selectors/user.selectors';

import { FavoriteService } from './service/favorite.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  resolvedFavoritesData!: ProductDto[];
  tokenStatus = false;
  urlEnums;

  /**
   * Constructor.
   * @param _route ActivatedRoute.
   * @param _store Store.
   * @param _favoriteService FavoriteService.
   * @param _router Router.
   */
  constructor(
    private _route: ActivatedRoute,
    private _store: Store,
    private _favoriteService: FavoriteService,
    private _router: Router
  ) {
    this.urlEnums = urlEnums;

    this._route.data.subscribe((data) => {
      this.resolvedFavoritesData = data?.['resolvedData']?.data || [];
    });

    this._store.select(getUserData).subscribe((res) => {
      this.tokenStatus = !!res; // res null, undefined, 0, "", false falsy olacak
    });
  }

  /**
   * RemoveFromFavorites.
   * @param item Item.
   */
  public removeFromFavorites(item: ProductDto): void {
    this._favoriteService.deleteUserFavoriteProduct(item.id).subscribe(() => {
      this.resolvedFavoritesData = this.resolvedFavoritesData.filter((fav) => fav !== item);
    });
  }

  /**
   * NavigateToProductDetails.
   * @param productId ProductId.
   */
  public navigateToProductDetails(productId: number): void {
    this._router.navigate([this.urlEnums.productDetails, productId]);
  }
}
