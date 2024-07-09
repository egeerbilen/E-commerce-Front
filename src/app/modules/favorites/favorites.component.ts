import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductDto } from 'src/app/shared/dto/product-dto';
import { getUserData } from 'src/app/shared/ng-rx/selectors/user.selectors';
import { LoadingPageService } from 'src/app/shared/services/loading-page/loading-page.service';

import { FavoriteService } from './service/favorite.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  resolvedFavoritesData!: ProductDto[];
  tokenStatus = false;

  /**
   * Constructor.
   * @param _route ActivatedRoute.
   * @param _store Store.
   * @param _favoriteService FavoriteService.
   * @param _loadingPageService LoadingPageService.
   */
  constructor(
    private _route: ActivatedRoute,
    private _store: Store,
    private _favoriteService: FavoriteService,
    private _loadingPageService: LoadingPageService
  ) {
    this._loadingPageService.show();
    this._route.data.subscribe((data) => {
      this.resolvedFavoritesData = data?.['resolvedData']?.data || [];
    });

    this._store.select(getUserData).subscribe((res) => {
      this.tokenStatus = !!res; // res null, undefined, 0, "", false falsy olacak
    });
    this._loadingPageService.hide();
  }

  /**
   * RemoveFromFavorites.
   * @param item Item.
   */
  public removeFromFavorites(item: ProductDto): void {
    this._loadingPageService.show();
    this._favoriteService.deleteUserFavoriteProduct(item.id).subscribe(() => {
      this.resolvedFavoritesData = this.resolvedFavoritesData.filter((fav) => fav !== item);
    });
    this._loadingPageService.hide();
  }
}
