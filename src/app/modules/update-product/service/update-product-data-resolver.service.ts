import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { ProductDetailsDto } from 'src/app/shared/dto/product-details-dto';
import { apiEndpoint } from 'src/app/shared/enviroments/api-endpoint';
import { ApiHelperService } from 'src/app/shared/services/api-helper/api-helper.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateProductDataResolverService {
  /**
   * Constructor.
   * @param http Http Request Service.
   * @param _router Route to url.
   */
  constructor(
    public http: ApiHelperService,
    private _router: Router
  ) {}

  /**
   * Data to be received when the module is opened.
   * @param route Route.
   * @returns Get products.
   */
  public resolve(route: ActivatedRouteSnapshot): Observable<CustomResponseDto<ProductDetailsDto>> {
    const id = route.paramMap.get('id') ?? '';

    if (!id) {
      this._router.navigate(['/not-found']);
    }
    return this.getProductByIdWithProductDetails(id);
  }

  /**
   * Get Products.
   * @param id Number.
   * @returns Products values.
   */
  public getProductByIdWithProductDetails(id: string): Observable<CustomResponseDto<ProductDetailsDto>> {
    return this.http.get(apiEndpoint.product + 'GetProductByIdWithProductDetails/' + id);
  }
}
