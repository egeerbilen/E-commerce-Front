import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { urlEnums } from 'src/app/enums/url-enums';
import { CategoryDto } from 'src/app/shared/dto/category-dto';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { ProductDto } from 'src/app/shared/dto/product-dto';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateProductDataResolverService {
  urlEnums;
  /**
   * Constructor.
   * @param _router Route to url.
   * @param _categoriyService CategoriyService.
   * @param _productService ProductService.
   */
  constructor(
    private _router: Router,
    private _categoriyService: CategoryService,
    private _productService: ProductService
  ) {
    this.urlEnums = urlEnums;
  }

  /**
   * Data to be received when the module is opened.
   * @param route Route.
   * @returns Get products.
   */
  public resolve(
    route: ActivatedRouteSnapshot
  ): Observable<{ product: CustomResponseDto<ProductDto>; categories: CustomResponseDto<CategoryDto[]> }> {
    const id = route.paramMap.get('id') ?? '';

    if (!id) {
      this._router.navigate([this.urlEnums.notFoundPage]);
    }

    return forkJoin({
      product: this._productService.getProductById(id),
      categories: this._categoriyService.getCategories()
    });
  }
}
