import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { ProductCreateDto } from 'src/app/shared/dto/product-create-dto';
import { apiEndpoint } from 'src/app/shared/enviroments/api-endpoint';

import { AddProductDataResolverService } from './add-product-data-resolver.service';

@Injectable({
  providedIn: 'root'
})
export class AddProductService extends AddProductDataResolverService {
  /**
   * Get Products.
   * @param productCreateDto ProductCreateDto.
   * @returns Products values.
   */
  public addProduct(productCreateDto: ProductCreateDto): Observable<CustomResponseDto<null>> {
    return this.http.post(apiEndpoint.product + 'Create/', productCreateDto);
  }
}
