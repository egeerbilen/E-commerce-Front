import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { UserFavoritesProductsDto } from 'src/app/shared/dto/user-favorites-prodcut-dto';
import { getUserData } from 'src/app/shared/ng-rx/selectors/user.selectors';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  resolvedFavoritesData!: CustomResponseDto<UserFavoritesProductsDto[]>;
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
      this.resolvedFavoritesData = data['resolvedData'];
    });

    this._store.select(getUserData).subscribe((res) => {
      if (res) {
        this.tokenStatus = true;
      } else {
        this.tokenStatus = false;
      }
    });
  }
}
