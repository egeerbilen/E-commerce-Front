import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductDto } from 'src/app/shared/dto/product-dto';
import { getUserData } from 'src/app/shared/ng-rx/selectors/user.selectors';

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
   */
  constructor(
    private _route: ActivatedRoute,
    private _store: Store
  ) {
    this._route.data.subscribe((data) => {
      this.resolvedFavoritesData = data['resolvedData'].data;
      console.log(this.resolvedFavoritesData);
    });

    this._store.select(getUserData).subscribe((res) => {
      if (res) {
        this.tokenStatus = true;
      } else {
        this.tokenStatus = false;
      }
    });
  }

  /**
   * RemoveFromFavorites.
   * @param item Item.
   */
  public removeFromFavorites(item: ProductDto): void {
    this.resolvedFavoritesData = this.resolvedFavoritesData.filter((fav) => fav !== item);
    console.log('Service e bağla');
  }
}
