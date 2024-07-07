import { Injectable } from '@angular/core';
import { CustomResponseDto } from 'src/app/shared/dto/custom-response-dto';
import { ProductUpdateDto } from 'src/app/shared/dto/product-update-dto';
import { apiEndpoint } from 'src/app/shared/enviroments/api-endpoint';

import { UpdateProductDataResolverService } from './update-product-data-resolver.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateServiceService extends UpdateProductDataResolverService {
  /**
   * Update product by id.
   * @param productObject Product object.
   * @returns Return.
   */
  public updateProduct<T>(productObject: ProductUpdateDto): any {
    return this.http.put<CustomResponseDto<T>>(apiEndpoint.product + 'Update/', productObject);
  }

  /**
   * Delete product by id.
   * @param productId Product id.
   */
  public deleteProductById(productId: string): void {
    this.http.delete(apiEndpoint.product + 'Delete/' + productId);
  }
}
