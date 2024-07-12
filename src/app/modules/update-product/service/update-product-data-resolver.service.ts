import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { CategoryDto } from 'src/app/shared/dto/category-dto';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { ProductDto } from 'src/app/shared/dto/product-dto';
import { CategoryService } from 'src/app/shared/services/categoriy/categoriy.service';

import { ProductDatailsDataResolverService } from '../../product-details/service/product-datails-data-resolver.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateProductDataResolverService {
  /**
   * Constructor.
   * @param _productDatailsDataResolverService ProductDatailsDataResolverService.
   * @param _router Route to url.
   * @param _categoriyService CategoriyService.
   */
  constructor(
    private _productDatailsDataResolverService: ProductDatailsDataResolverService,
    private _router: Router,
    private _categoriyService: CategoryService
  ) {}

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
      this._router.navigate(['404']);
    }

    return forkJoin({
      product: this._productDatailsDataResolverService.getProductById(id),
      categories: this._categoriyService.getCategories()
    });
  }

  /**
   * Get Products.
   * @returns Products values.
   */
  public getCategories(): Observable<CustomResponseDto<CategoryDto[]>> {
    return this._categoriyService.getCategories();
  }
}
