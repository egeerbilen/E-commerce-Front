import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { ProductDto } from 'src/app/shared/dto/product-dto';
import { apiEndpoint } from 'src/app/shared/enviroments/api-endpoint';
import { ApiHelperService } from 'src/app/shared/services/api-helper/api-helper.service';

@Injectable({
  providedIn: 'root'
})
export class ProductDatailsDataResolverService {
  /**
   * Constructor.
   * @param _http Http Request Service.
   * @param _router Route to url.
   */
  constructor(
    private _http: ApiHelperService,
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
      this._router.navigate(['/not-found']);
    }
    return this.getProductById(id);
  }

  /**
   * Get Products.
   * @param id Number.
   * @returns Products values.
   */
  public getProductById(id: string): Observable<CustomResponseDto<ProductDto>> {
    return this._http.get(apiEndpoint.product + 'GetById/' + id);
  }
}
