import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { ProductCreateDto } from 'src/app/shared/dto/product-create-dto';
import { apiEndpoint } from 'src/app/shared/enviroments/api-endpoint';
import { ApiHelperService } from 'src/app/shared/services/api-helper/api-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {
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
   * Get Products.
   * @param productCreateDto ProductCreateDto.
   * @returns Products values.
   */
  public addProduct(productCreateDto: ProductCreateDto): Observable<CustomResponseDto<null>> {
    return this._http.post(apiEndpoint.product + 'Create/', productCreateDto);
  }
}
