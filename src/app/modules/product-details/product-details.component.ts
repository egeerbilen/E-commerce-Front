import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastService } from 'src/app/helpers/toast/toast.service';
import { BasketProductDto } from 'src/app/shared/dto/basket-product-dto';
import { DecodedTokenWithJwtDto } from 'src/app/shared/dto/decoded-token-with-jwt-dto';
import { ProductDetailsDto } from 'src/app/shared/dto/product-details-dto';
import { ProductDto } from 'src/app/shared/dto/product-dto';
import { getUserData } from 'src/app/shared/ng-rx/selectors/user.selectors';
import { BasketService } from 'src/app/shared/services/basket/basket.service';
import { FavoriteService } from 'src/app/shared/services/favorite/favorite.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  resolvedData!: ProductDetailsDto;
  product!: ProductDto;
  decodedToken: DecodedTokenWithJwtDto | null = null;
  isFavorite = false;
  numberOfProducts = 1; // Kullanıcıdan alınacak ürün miktarı için değişken.

  /**
   * Constructor.
   * @param _route ActivatedRoute.
   * @param _store Store.
   * @param _favoriteService FavoriteService.
   * @param _basketService BasketService.
   * @param _toastService ToastService.
   */
  constructor(
    private _route: ActivatedRoute,
    private _store: Store,
    private _favoriteService: FavoriteService,
    private _basketService: BasketService,
    private _toastService: ToastService
  ) {
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
      this.decodedToken = res;
      console.log(this.decodedToken);
    });
  }

  /**
   * AddToBasket.
   */
  public addToBasket(): void {
    const basketProduct: BasketProductDto = {
      basketId: this.decodedToken!.basketId,
      productId: this.product.id.toString(),
      numberOfProducts: this.numberOfProducts // Kullanıcıdan alınan ürün miktarı.
    };
    this._basketService.updateBasketProduct(basketProduct).subscribe((res) => {
      if (res.errors) {
        this._toastService.show('Product is already in the basket');
      } else {
        this._toastService.show('Product added to basket');
      }
    });
  }

  /**
   * AddToFavorites.
   */
  public addToFavorites(): void {
    this.isFavorite = !this.isFavorite;
    if (this.isFavorite) {
      this._favoriteService.createUserFavoriteProduct(this.product.id).subscribe(() => {
        this._toastService.show('Product added to favorites!');
      });
    } else {
      this._favoriteService.deleteUserFavoriteProduct(this.product.id).subscribe(() => {
        this._toastService.show('Product removed from favorites!');
      });
    }
  }
}
