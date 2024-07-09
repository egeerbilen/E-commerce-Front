import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductDetailsDto } from 'src/app/shared/dto/product-details-dto';
import { ProductDto } from 'src/app/shared/dto/product-dto';
import { getUserData } from 'src/app/shared/ng-rx/selectors/user.selectors';
import { LoadingPageService } from 'src/app/shared/services/loading-page/loading-page.service';

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
   */
  constructor(
    private _route: ActivatedRoute,
    private _store: Store,
    private _loadingPageService: LoadingPageService
  ) {
    this._loadingPageService.show();
    this._route.data.subscribe((data) => {
      this.resolvedData = data['resolvedData'];
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
    console.log(this.product);
    console.log('addToBasket');
    this._loadingPageService.hide();
  }

  /**
   * AddToFavorites.
   */
  public addToFavorites(): void {
    this._loadingPageService.show();
    console.log(this.isFavorite);
    this.isFavorite = !this.isFavorite;
    console.log(this.isFavorite);
    console.log(this.product);
    console.log('addToFavorites back endde bu user ın bu ürünü favoridemi ture false dönemeli');
    this._loadingPageService.hide();
  }
}
