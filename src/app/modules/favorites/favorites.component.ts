import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductDto } from 'src/app/shared/dto/product-dto';
import { getUserData } from 'src/app/shared/ng-rx/selectors/user.selectors';
import { UserLocalStoregeFavoritesService } from 'src/app/shared/services/favorites/user-favorites-local-storege.service';

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
   * @param _userLocalStoregeFavoritesService UserLocalStoregeFavoritesService.
   */
  constructor(
    private _route: ActivatedRoute,
    private _store: Store,
    private _favoriteService: FavoriteService,
    private _userLocalStoregeFavoritesService: UserLocalStoregeFavoritesService
  ) {
    this._route.data.subscribe((data) => {
      this.resolvedFavoritesData = data['resolvedData'].data;
    });

    if (!this.resolvedFavoritesData) {
      // this.resolvedFavoritesData = this._userLocalStoregeFavoritesService.getItems();
    }
    console.log();

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
    console.log('Service e bağla');
  }
}
