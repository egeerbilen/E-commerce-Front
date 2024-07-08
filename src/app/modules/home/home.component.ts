import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastService } from 'src/app/helpers/toast/toast.service';
import { CategoryDto } from 'src/app/shared/dto/category-dto';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { ProductDto } from 'src/app/shared/dto/product-dto';
import { getUserData } from 'src/app/shared/ng-rx/selectors/user.selectors';
import { UserLocalStoregeFavoritesService } from 'src/app/shared/services/favorites/user-favorites-local-storege.service';

import { FavoriteService } from '../favorites/service/favorite.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  resolvedCategoriesData!: CustomResponseDto<CategoryDto[]>;
  resolvedProductsData!: CustomResponseDto<ProductDto[]>;
  tokenStatus = false;
  searchText = '';
  filteredData: ProductDto[] = [];
  favoriteProducts: number[] = [];
  favoriteStatus: { [key: number]: boolean } = {};

  /**
   * Constructor.
   * @param _route ActivatedRoute.
   * @param _store Store.
   * @param _toastService ToastService.
   * @param _favoriteService FavoriteService.
   * @param _userLocalStoregeFavoritesService UserLocalStoregeFavoritesService.
   */
  constructor(
    private _route: ActivatedRoute,
    private _store: Store,
    private _toastService: ToastService,
    private _favoriteService: FavoriteService,
    private _userLocalStoregeFavoritesService: UserLocalStoregeFavoritesService
  ) {
    this.favoriteProducts = this._userLocalStoregeFavoritesService.getItems();

    this._route.data.subscribe((data) => {
      this.resolvedProductsData = data['resolvedData'].getProducts; // Access resolved data here
      this.resolvedCategoriesData = data['resolvedData'].getCategories; // Access resolved data here

      if (this.resolvedProductsData.data) {
        const allProductsCategory: CategoryDto = { id: 0, name: 'Tüm Ürünler' };
        this.resolvedCategoriesData.data!.unshift(allProductsCategory);

        this.filteredData = this.resolvedProductsData.data;
        this._initializeFavoriteStatus();
      }
    });

    this._store.select(getUserData).subscribe((res) => {
      this.tokenStatus = !!res; // res null, undefined, 0, "", false falsy olacak
    });
  }

  /**
   * InitializeFavoriteStatus.
   */
  private _initializeFavoriteStatus(): void {
    this.favoriteStatus = this.filteredData.reduce(
      (acc, product) => {
        acc[product.id] = this.favoriteProducts.includes(product.id);
        return acc;
      },
      {} as { [key: number]: boolean }
    );
  }

  /**
   * OnCategorySelected.
   * @param category Category.
   */
  public onCategorySelected(category: number): void {
    if (!category) {
      this.filteredData = this.resolvedProductsData.data ?? [];
    } else {
      this.filteredData = this.resolvedProductsData.data!.filter((item) => item.categoryId === category);
    }
    this._initializeFavoriteStatus();
  }

  /**
   * DeleteProduct.
   * @param productId ProductId.
   */
  public deleteProduct(productId: number): void {
    this.resolvedProductsData.data = this.resolvedProductsData.data!.filter((product) => product.id !== productId);
    this.filteredData = this.filteredData.filter((product) => product.id !== productId);
    delete this.favoriteStatus[productId];
    console.log('Servis ekle');
  }

  /**
   * AddToBasket.
   * @param productId ProductId.
   */
  public addToBasket(productId: number): void {
    // Sepete ekleme işlemini burada gerçekleştirin
    console.log('Product added to cart:', productId);
  }

  /**
   * AddToFavorites.
   * @param productId ProductId.
   */
  public addToFavorites(productId: number): void {
    if (this.favoriteProducts.includes(productId)) {
      console.log('local storage kullan');
      this.favoriteProducts = this.favoriteProducts.filter((id) => id !== productId);
      this._toastService.show('Product removed to favorites');
      this.favoriteStatus[productId] = false;
      this._favoriteService.deleteUserFavoriteProduct(productId);
      this._userLocalStoregeFavoritesService.removeItem(productId);
    } else {
      this.favoriteProducts.push(productId);
      this.favoriteStatus[productId] = true;
      this._toastService.show('Product added to favorites');
      this._favoriteService.createUserFavoriteProduct(productId);
      this._userLocalStoregeFavoritesService.addItem(productId);
    }
  }
}
