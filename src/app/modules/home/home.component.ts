import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastService } from 'src/app/helpers/toast/toast.service';
import { CategoryDto } from 'src/app/shared/dto/category-dto';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { ProductDto } from 'src/app/shared/dto/product-dto';
import { getUserData } from 'src/app/shared/ng-rx/selectors/user.selectors';
import { LoadingPageService } from 'src/app/shared/services/loading-page/loading-page.service';

import { FavoriteService } from '../favorites/service/favorite.service';
import { HomeService } from './service/home.service';

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
  isSeller = false;

  /**
   * Constructor.
   * @param _route ActivatedRoute.
   * @param _store Store.
   * @param _toastService ToastService.
   * @param _favoriteService FavoriteService.
   * @param _homeService HomeService.
   * @param _loadingPageService LoadingPageService.
   */
  constructor(
    private _route: ActivatedRoute,
    private _store: Store,
    private _toastService: ToastService,
    private _favoriteService: FavoriteService,
    private _homeService: HomeService,
    private _loadingPageService: LoadingPageService
  ) {
    this._loadingPageService.show();
    this._favoriteService.getUserFavoritesProducts().subscribe((res) => {
      if (res?.data) {
        this.favoriteProducts = res.data.map((product) => product.id);
        this.favoriteProducts.forEach((id) => {
          this.favoriteStatus[id] = true;
        });
      }
    });

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
      this.isSeller = !!res?.roles?.includes('Seller');
    });
    this._loadingPageService.hide();
  }

  /**
   * OnCategorySelected.
   * @param category Category.
   */
  public onCategorySelected(category: number): void {
    this._loadingPageService.show();
    if (!category) {
      this.filteredData = this.resolvedProductsData.data ?? [];
    } else {
      this.filteredData = this.resolvedProductsData.data!.filter((item) => item.categoryId === category);
    }
    this._initializeFavoriteStatus();
    this._loadingPageService.hide();
  }

  /**
   * DeleteProduct.
   * @param productId ProductId.
   */
  public deleteProduct(productId: number): void {
    this._loadingPageService.show();
    this.resolvedProductsData.data = this.resolvedProductsData.data!.filter((product) => product.id !== productId);
    this.filteredData = this.filteredData.filter((product) => product.id !== productId);
    this.favoriteStatus[productId];
    this._homeService.deleteProduct(productId).subscribe();
    this._loadingPageService.hide();
  }

  /**
   * AddToFavorites.
   * @param productId ProductId.
   */
  public addToFavorites(productId: number): void {
    this._loadingPageService.show();
    if (this.favoriteProducts.includes(productId)) {
      this.favoriteProducts = this.favoriteProducts.filter((id) => id !== productId);
      this._toastService.show('Product removed from favorites');
      this.favoriteStatus[productId] = false;
      this._favoriteService.deleteUserFavoriteProduct(productId).subscribe(() => {
        this.favoriteProducts = this.favoriteProducts.filter((id) => id !== productId);
        this.favoriteStatus[productId] = false;
      });
    } else {
      this.favoriteProducts.push(productId);
      this.favoriteStatus[productId] = true;
      this._toastService.show('Product added to favorites');
      this._favoriteService.createUserFavoriteProduct(productId).subscribe(() => {
        this.favoriteProducts.push(productId);
        this.favoriteStatus[productId] = true;
      });
    }
    this._loadingPageService.hide();
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
}
