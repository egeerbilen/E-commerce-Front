import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { forkJoin, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CategoryDto } from 'src/app/shared/dto/category-dto';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { ProductDto } from 'src/app/shared/dto/product-dto';
import { getUserData } from 'src/app/shared/ng-rx/selectors/user.selectors';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductManagementDataResolveService {
  /**
   * Constructor.
   * @param _categoryService CategoriyService.
   * @param _productService ProductService.
   * @param _store Store.
   */
  constructor(
    private _categoryService: CategoryService,
    private _productService: ProductService,
    private _store: Store
  ) {}

  /**
   * Data to be received when the module is opened.
   * @returns Get products and categories.
   */
  public resolve(): Observable<{ getProducts: CustomResponseDto<ProductDto[]>; getCategories: CustomResponseDto<CategoryDto[]> }> {
    return this._store.select(getUserData).pipe(
      switchMap((res) => {
        if (res?.roles.includes('SuperUser')) {
          return forkJoin({
            getProducts: this._productService.getAllProducts(),
            getCategories: this._categoryService.getCategories()
          });
        } else {
          return forkJoin({
            getProducts: this._productService.getUserProducts(),
            getCategories: this._categoryService.getCategories()
          });
        }
      })
    );
  }
}
