import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { CategoryDto } from 'src/app/shared/dto/category-dto';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { ProductDto } from 'src/app/shared/dto/product-dto';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Injectable({
  providedIn: 'root'
})
export class HomeDataResolverService {
  /**
   * Constructor.
   * @param _categoryService CategoriyService.
   * @param _productService ProductService.
   */
  constructor(
    private _categoryService: CategoryService,
    private _productService: ProductService
  ) {}

  /**
   * Data to be received when the module is opened.
   * @returns Get products.
   */
  public resolve(): Observable<{ getProducts: CustomResponseDto<ProductDto[]>; getCategories: CustomResponseDto<CategoryDto[]> }> {
    return forkJoin({
      getProducts: this._productService.getAllProducts(),
      getCategories: this._categoryService.getCategories()
    });
  }
}
