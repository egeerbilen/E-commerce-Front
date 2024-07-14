import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { urlEnums } from 'src/app/enums/url-enums';
import { OrderDto } from 'src/app/shared/dto/order-dto';
import { getUserData } from 'src/app/shared/ng-rx/selectors/user.selectors';
import { FavoriteService } from 'src/app/shared/services/favorite/favorite.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  resolvedOrderData!: OrderDto[];
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
      console.log(data);
      this.resolvedOrderData = data?.['resolvedData'].data || [];
    });
    console.log(this.resolvedOrderData);

    this._store.select(getUserData).subscribe((res) => {
      this.tokenStatus = !!res; // res null, undefined, 0, "", false falsy olacak
    });
  }
}
