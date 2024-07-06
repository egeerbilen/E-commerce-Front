import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { ProductDto } from 'src/app/shared/dto/product-dto';
import { apiEndpoint } from 'src/app/shared/enviroments/api-endpoint';
import { ApiHelperService } from 'src/app/shared/services/api-helper/api-helper.service';

@Injectable({
  providedIn: 'root'
})
export class HomeDataResolverService {
  /**
   * Constructor.
   * @param _http Http Request Service.
   */
  constructor(private _http: ApiHelperService) {}

  /**
   * Data to be received when the module is opened.
   * @returns Get products.
   */
  public resolve(): Observable<CustomResponseDto<ProductDto[]>> {
    return this.getProducts();
  }

  /**
   * Get Products.
   * @returns Products values.
   */
  public getProducts(): Observable<CustomResponseDto<ProductDto[]>> {
    return this._http.get(apiEndpoint.product + 'GetProducts');
  }
}
