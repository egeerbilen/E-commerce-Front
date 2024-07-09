import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { ProductDto } from 'src/app/shared/dto/product-dto';
import { ApiHelperService } from 'src/app/shared/services/api-helper/api-helper.service';

import { ProductDatailsDataResolverService } from '../../product-details/service/product-datails-data-resolver.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateProductDataResolverService {
  /**
   * Constructor.
   * @param _http Http Request Service.
   * @param _productDatailsDataResolverService ProductDatailsDataResolverService.
   * @param _router Route to url.
   */
  constructor(
    private _http: ApiHelperService,
    private _productDatailsDataResolverService: ProductDatailsDataResolverService,
    private _router: Router
  ) {}

  /**
   * Data to be received when the module is opened.
   * @param route Route.
   * @returns Get products.
   */
  public resolve(route: ActivatedRouteSnapshot): Observable<CustomResponseDto<ProductDto>> {
    const id = route.paramMap.get('id') ?? '';

    if (!id) {
      // http://localhost:4200/UpdateProduct/1233 ile dene route bak
      this._router.navigate(['404']);
    }
    return this._productDatailsDataResolverService.getProductById(id);
  }
}
