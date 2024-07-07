import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CategoryDto } from 'src/app/shared/dto/category-dto';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { ProductDto } from 'src/app/shared/dto/product-dto';
import { getUserData } from 'src/app/shared/ng-rx/selectors/user.selectors';

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
      this.resolvedProductsData = data['resolvedData'].getProducts; // Access resolved data here
      this.resolvedCategoriesData = data['resolvedData'].getCategories; // Access resolved data here
    });

    this._store.select(getUserData).subscribe((res) => {
      if (res) {
        this.tokenStatus = true;
      } else {
        this.tokenStatus = false;
      }
    });

    if (this.resolvedProductsData.data) {
      this.filteredData = this.resolvedProductsData.data; // Başlangıçta tüm verileri göster
    }
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
  }

  /**
   * DeleteProduct.
   * @param productId ProductId.
   */
  public deleteProduct(productId: number): void {
    this.resolvedProductsData.data = this.resolvedProductsData.data!.filter((product) => product.id !== productId);
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
}
