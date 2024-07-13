import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { urlEnums } from 'src/app/enums/url-enums';
import { ModalHelperService } from 'src/app/helpers/modal-helper/service/modal-helper-service.service';
import { ToastService } from 'src/app/helpers/toast/toast.service';
import { CategoryDto } from 'src/app/shared/dto/category-dto';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { ProductDto } from 'src/app/shared/dto/product-dto';
import { getUserData } from 'src/app/shared/ng-rx/selectors/user.selectors';
import { FavoriteService } from 'src/app/shared/services/favorite/favorite.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.html']
})
export class ProductManagementComponent {
  urlEnums;
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
   * @param _productService HomeService.
   * @param _modalHelperService ModalHelperService.
   */
  constructor(
    private _route: ActivatedRoute,
    private _store: Store,
    private _toastService: ToastService,
    private _favoriteService: FavoriteService,
    private _productService: ProductService,
    private _modalHelperService: ModalHelperService
  ) {
    this.urlEnums = urlEnums;

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
        const allProductsCategory: CategoryDto = { id: 0, name: 'All Category' };
        this.resolvedCategoriesData.data!.unshift(allProductsCategory);

        this.filteredData = this.resolvedProductsData.data;
        this._initializeFavoriteStatus();
      }
    });

    this._store.select(getUserData).subscribe((res) => {
      this.tokenStatus = !!res; // res null, undefined, 0, "", false falsy olacak
      this.isSeller = !!res?.roles?.includes('Admin');
      // !!!!!!!!!!!!
      // !!!!!!!!!!!!
    });
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
  public async deleteProduct(productId: number): Promise<void> {
    const productToDelete = this.resolvedProductsData.data!.find((product) => product.id !== productId);

    const logoutStatus = await this._modalHelperService.openModal(
      'Delete Product',
      'Are you sure you want to delete ' + productToDelete?.name + ' ?'
    );

    if (!logoutStatus) {
      return;
    }

    this.resolvedProductsData.data = this.resolvedProductsData.data!.filter((product) => product.id !== productId);
    this.filteredData = this.filteredData.filter((product) => product.id !== productId);
    this._productService.deleteProduct(productId).subscribe();
  }

  /**
   * AddToFavorites.
   * @param productId ProductId.
   */
  public addToFavorites(productId: number): void {
    if (this.favoriteProducts.includes(productId)) {
      this.favoriteProducts = this.favoriteProducts.filter((id) => id !== productId);
      this.favoriteStatus[productId] = false;
      this._favoriteService.deleteUserFavoriteProduct(productId).subscribe(() => {
        this.favoriteProducts = this.favoriteProducts.filter((id) => id !== productId);
        this.favoriteStatus[productId] = false;
        this._toastService.show('Product removed from favorites');
      });
    } else {
      this.favoriteProducts.push(productId);
      this.favoriteStatus[productId] = true;
      this._favoriteService.createUserFavoriteProduct(productId).subscribe(() => {
        this.favoriteProducts.push(productId);
        this.favoriteStatus[productId] = true;
        this._toastService.show('Product added to favorites');
      });
    }
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
